import express from "express";

const url = "https://api.visualthinking.fdnd.nl/api/v1/";

// Maak een nieuwe express app
const server = express();

// Stel de view engine in
server.set("view engine", "ejs");
server.set("views", "./views");

// Stel de public map in
server.use(express.static("public"));

// Stel afhandeling van formulieren inzx
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Maak een route voor de index
server.get("/", (request, response) => {
  let methodsUrl = url + "/methods?first=1000";
  fetchJson(methodsUrl).then((data) => {
    response.render("index", data);
  });
});
server.get("/method/:slug", (request, response) => {
  let detailPageUrl = url + "method/" + request.params.slug;
  const id = request.query.id;
  fetchJson(detailPageUrl).then((data) => {
    response.render("method", data);
  });
});

server.get("/method/:slug/steps", (request, response) => {
  let detailPageUrl = url + "method/" + request.params.slug;

  fetchJson(detailPageUrl).then((data) => {
    response.render("steps", data);
  });
});

server.get("/method/:slug/examples", (request, response) => {
  let detailPageUrl = url + "method/" + request.params.slug;
  fetchJson(detailPageUrl).then((data) => {
    response.render("examples", data);
  });
});

server.get("/method/:slug/form", (request, response) => {
  let detailPageUrl = url + "method/" + request.params.slug;
  const baseUrl = "https://api.visualthinking.fdnd.nl/api/v1/";
  const commentUrl = `${baseUrl}comments` + "?id=" + request.query.id;

  fetchJson(detailPageUrl).then((data) => {
    fetchJson(commentUrl).then((data2) => {
      const newdata = { detail: data, form: data2, slug: request.params.slug };

      response.render("form", newdata);
    });
  });
});

server.post("/method/:slug/form", (request, response) => {
  const baseurl = "https://api.visualthinking.fdnd.nl/api/v1/";
  const url = `${baseurl}comments`;

  postJson(url, request.body).then((data) => {
    if (data.success) {
      response.redirect(
        "/method/" + request.params.slug + "?methodPosted=true"
      );
    } else {
      response.redirect(
        "/method/" + request.params.slug + "?methodPosted=false"
      );
    }
  });
});

// Stel het poortnummer in en start express
server.set("port", process.env.PORT || 8000);
server.listen(server.get("port"), function () {
  console.log(
    `serverlication started on http://localhost:${server.get("port")}`
  );
});

/**
 * Wraps the fetch api and returns the response body parsed through json
 * @param {*} url the api endpoint to address
 * @returns the json response from the api endpoint
 */
async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => error);
}

// post json

export async function postJson(url, body) {
  return await fetch(url, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .catch((error) => error);
}
