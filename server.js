// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import { name } from "ejs";
import fetchJson from "./helpers/fetch-json.js";

// Maak een nieuwe express app aan
const app = express();

// Importeer het npm pakket express uit de node_modules map
import express, { json } from "express";

// Stel ejs in als template engine
app.set("view engine", "ejs");

// Stel de map met ejs templates in
app.set("views", "./views");

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static("public"));

// Zorg dat werken met request data makkelijker wordt
app.use(express.urlencoded({ extended: true }));

// TODO: routes voor deze Hand-Footprint applicatie..

// Variabeles aanmaken voor de routes
const apiUrl = "https://fdnd-agency.directus.app/items/";
const sdgList = apiUrl + "hf_sdgs";
const companyList = apiUrl + "hf_companies";
const stakeholders = apiUrl + "hf_stakeholders?fields=*.*.*.*`";

// GET && POST voor Dashboard
app.get("/dashboard/:id", function (request, response) {
  // Gebruik de request parameter id en haal de juiste persoon uit de WHOIS API op
  fetchJson(companyList + "/" + request.params.id).then((companyData) => {
    fetchJson(stakeholders + "/" + request.params.id).then(
      (stakeholderData) => {
        response.render("dashboard", {
          company: companyData.data,
          stakers: stakeholderData.data,
        });
      }
    );
  });
});

app.get("/stakeholder/:id", function (request, response) {
  // Gebruik de request parameter id en haal de juiste persoon uit de WHOIS API op
  fetchJson(companyList + "/" + request.params.id).then((companyData) => {
    fetchJson(stakeholders + "/" + request.params.id).then(
      (stakeholderData) => {
        response.render("stakeholder", {
          company: companyData.data,
          stakers: stakeholderData.data,
        });
      }
    );
  });
});

app.post("/stakeholder/:id", function (request, response) {
  const bedrijfId = request.params.id;
  const medewerkers = request.body.medewerkers;
  const financiers = request.body.financiers;
  const leveranciers = request.body.leveranciers;
  const klanten = request.body.klanten;
  const omgeving = request.body.omgeving;
  const name = request.body.message;
  const stakeholder = [];
  let aangevinkteRadiobox;
  if (medewerkers) {
    aangevinkteRadiobox = "medewerkers";
  } else if (financiers) {
    aangevinkteRadiobox = "financiers";
  } else if (leveranciers) {
    aangevinkteRadiobox = "leveranciers";
  } else if (klanten) {
    aangevinkteRadiobox = "klanten";
  } else if (omgeving) {
    aangevinkteRadiobox = "omgeving";
  }

  console.log("Bedrijf: " + bedrijfId);
  console.log("Type: " + aangevinkteRadiobox);
  console.log("Naam: " + name);

  stakeholder.push(bedrijfId, aangevinkteRadiobox, name);

  fetch("https://fdnd-agency.directus.app/items/hf_stakeholders", {
    method: "POST",
    body: JSON.stringify({
      company_id: bedrijfId,
      type: aangevinkteRadiobox,
      name: name,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((postReponse) => {

  });
  console.log(stakeholder);
});

// Stel het poortnummer in waar express op moet gaan luisteren
app.set("port", process.env.PORT || 8000);

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get("port"), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get("port")}`);
});
