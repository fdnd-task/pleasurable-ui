import express from "express";

const app = express();

import fetchJson from "./helpers/fetch-json.js";
import { promises } from "dns";

// main HTML files and the public files
app.set("views", "./views");
app.use(express.static("./public/"));

// ejs
app.set("view engine", "ejs");

// dont know what this does
app.use(express.urlencoded({ extended: true }));

//!!!!!!!!!! External router concept !!!!!!!!!!!!!

// const authorRouter = require("./server-routes/author");
// const userRouter = require("./server-routes/user");
// const postRouter = require("./server-routes/post");
// const categoriesRouter = require("./server-routes/categories");

// app.use("/author", authorRouter);
// app.use("/user", userRouter);
// app.use("/post", postRouter);
// app.use("/categories", categoriesRouter);




// Redpers database //

// main Url
const apiUrl = "https://redpers.nl/wp-json/wp/v2";

//directus url
const directus_apiUrl = "https://fdnd-agency.directus.app/items/redpers_shares";
// const directus_filterUrl = `${directus_apiUrl}?filter[id][_eq]=${request.params.id}`;

//End points //

//post
const postsUrl = `${apiUrl}/posts?per_page=100&orderby=date&order=desc`;
//users
const usersUrl = `${apiUrl}/users?_embed`;
//categories
const categoryUrl = `${apiUrl}/posts?per_page=100&orderby=date&order=desc&categories=1,4,6,9,63,94,1010,3211,7164&_fields=id,categories,slug,date_gmt,excerpt,status,author,yoast_head_json`;
const categoriesUrl = `${apiUrl}categories?per_page=100`
// GET route for index
app.get("/",function(req,res){
	Promise.all([
		fetchJson(postsUrl),
		fetchJson(usersUrl),
		fetchJson(categoryUrl)
	])
	.then(([postData,userData,categoryData]) => {

		// all the other functions
		// datePars(); // fix this parser issue

		res.render("index.ejs", {
			postData,
			userData,
			categoryData});
		
			console.log("home success");

	})
	// .catch(err => console.log(err,res.status(500).send("Error fetching data")));
});

// GET route for post
app.get("/post/:id",function(req,res){

	res.render("post.ejs",{})
	res.redirect(303, '/');

});






// GET route for category list
app.get("/categories",function(req,res){

	res.render("category.ejs",{})
	res.redirect(303, '/');

});

// GET route for individual category 
app.get("/category/:slug",function(req,res){

	res.render("category.ejs",{})
	res.redirect(303, '/');

});

// GET route for author list
app.get("/authors",function(req,res){

	res.render("authors.ejs",{})
	res.redirect(303, '/');

});

// GET route for individual author 
app.get("/author/:id",function(req,res){

	res.render("author.ejs",{})
	res.redirect(303, '/');

})

// ports //
app.set("port", process.env.PORT || 808);

app.listen(app.get("port"), function(){
	console.log(`Test link ${app.get("port")}`);
	console.log("Server listening on port " + '👉 ' + `http://localhost:${app.get("port")}`+ ' 👈');
});

