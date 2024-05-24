/*** Express setup & start ***/

// Importeer het npm pakket express uit de node_modules map
import express from "express";

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from "./helpers/fetch-json.js";

// Importeer slugify voor leesbare URLs met slug
// import slugify from "slugify";

// Declare de base URL van de directus API
const baseUrl = "https://fdnd-agency.directus.app";

// Maak een nieuwe express app aan
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Stel ejs in als template engine
app.set("view engine", "ejs");

// Stel de map met ejs templates in
app.set("views", "./views");

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static("public"));

// Fetch de data van de API
const fetchFromApi = (endpoint) => {
    return fetchJson(baseUrl + endpoint).then((response) => response.data);
  };
  
// Data ophalen van de API
// fetchData().then((allAdvertisementsData) => {
  
// Zorg dat werken met request data makkelijker wordt
app.use(express.urlencoded({ extended: true }));

// GET-route voor vraag-aanbod pagina, eigen data inladen 
app.get("/vraag-aanbod", function (request, response) {
    fetchJson("https://fdnd-agency.directus.app/items/dh_services").then(
      (apiData) => {
        {
          response.render("vraag-aanbod.ejs", { vraagaanbod: apiData.data });
        }
      }
    );
  });

// POST-route voor het liken van een initatief
app.post("/like", async function (request, response) {
    const initiatiefId = request.body.initiatiefId;
    const likes = request.body.likes
  
    console.log("Like verzoek voor service met ID:", initiatiefId);
    
    if (initiatiefId) {
        // Update het aantal likes in de Directus API
        fetchJson(`https://fdnd-agency.directus.app/items/dh_services/${initiatiefId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ likes: Number(likes) + Number(1) })
        }).then((data) => {
            console.log(data);
            console.log("Aantal likes bijgewerkt voor service:", initiatiefId, likes);
            response.redirect("/vraag-aanbod")
  
  
        }).catch((error) => {
            console.error("Error patching likes in Directus API:", error);
        });
  
    } else {
      // Laat het weten als de service niet gevonden is.
      console.log("Service niet gevonden voor ID:", initiatiefId);
      response.status(404).send("Service niet gevonden");
    }
  });
  
  // Poortnummer instellen waarop Express moet luisteren
  app.set("port", process.env.PORT || 8000);
  
  // Start express server op, haal daarbij het zojuist ingestelde poortnummer op
  app.listen(app.get("port"), function () {
    // Toon een bericht in de console en geef het poortnummer door
    console.log(`Application started on http://localhost:${app.get("port")}`);
  });