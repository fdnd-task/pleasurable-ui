// Importeer het npm pakket express uit de node_modules map
import express from "express";

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from "./helpers/fetch-json.js";

// Maak een nieuwe express app aan
const app = express();

const apiUrl = "https://fdnd-agency.directus.app/items/";
const f_houses = apiUrl + "f_houses";
const f_list = apiUrl + "f_list";
const f_files = apiUrl + "f_houses_files";
const f_feedback = apiUrl + "f_feedback";

// Stel ejs in als template engine
app.set("view engine", "ejs");

// Stel de map met ejs templates in
app.set("views", "./views");

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static("public"));

// Zorg dat werken met request data makkelijker wordt
app.use(express.urlencoded({ extended: true }));

// ---- GET Routes ----

// Maak een GET route voor de favorieten pagina
app.get("/", function (request, response) {
    // Voer tegelijkertijd een GET request uit naar de API om de huizen, en de ratings op te halen
    Promise.all([
        fetch(
            "https://fdnd-agency.directus.app/items/f_list/6?fields=id,title,description,users.id,users.f_users_id.name,users.f_users_id.email,users.f_users_id.avatar,houses.id,houses.f_houses_id.id,houses.f_houses_id.street,houses.f_houses_id.house_nr,houses.f_houses_id.city,houses.f_houses_id.postal_code,houses.f_houses_id.price,houses.f_houses_id.poster_image.id,houses.f_houses_id.poster_image.width,houses.f_houses_id.poster_image.height"
        ),
        fetch(
            "https://fdnd-agency.directus.app/items/f_feedback?fields=house,rating&filter[list][_eq]=6"
        )
    ]).then(function (responses) {
        // Maak van beide responses een json object
        return Promise.all(responses.map(function (response) {
            return response.json();
        }));
    }).then(function (data) {
        // Maak een nieuwe array aan waarin de huizen en de ratings worden gecombineerd
        // data[0] is de response van de huizen fetch
        // data[1] is de response van de ratings fetch
        const houses = data[0].data;
        const ratings = data[1].data.reverse();
        const updatedHousesData = houses.houses.map((house) => {
            const foundRating = ratings.find((currentRating) => currentRating.house === house.f_houses_id.id);
            return {
                ...house,
                rating: foundRating ? foundRating.rating.general : 0,
            };
        });
        const finalData = { ...houses, houses: updatedHousesData };

        // Render de favorieten.ejs template en geef de gecombineerde data mee
        response.render("favorieten", { data: finalData });
    }).catch(function (error) {
        // if there's an error in any of the fetches, it will be caught here
        console.error('Error:', error);
    });
});

// Get route voor een detailpagina met een request parameter id
app.get("/detail/:id", function (request, response) {
    fetchJson(f_houses + "/" + request.params.id + "?fields=*.*.*.*").then(
        (housesData) => {
            response.render("detail", { house: housesData.data });
        }
    );
});

// ---- POST Routes ----

app.post("/rate/:id/:rating", function (request, response) {
    const id = request.params.id;
    const rating = request.params.rating;

    fetch("https://fdnd-agency.directus.app/items/f_feedback", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            house: id,
            list: 6,
            user: 6,
            rating: { general: rating },
        }),
    }).then((data) => {
        response.json(data);
    });
});

// Stel het poortnummer in waar express op moet gaan luisteren
app.set("port", process.env.PORT || 8000);

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get("port"), function () {
    // Toon een bericht in de console en geef het poortnummer door
    console.log(`Application started on http://localhost:${app.get("port")}`);
});
