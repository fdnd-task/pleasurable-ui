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

// functions
// const datePars = function(){ // ask how to implement this function and fix the post data
// 	for(var i = 0; i < postData.length;i++){
// 	const parsedDate = new Date(postData[i].date),
// 	day = parsedDate.getDate(),
// 	options = { month: "short" }, // De maand moet kort geschreven zijn
// 	month = Intl.DateTimeFormat("nl-NL", options).format(parsedDate.getMonth() + 1),
// 	newDate = day + ''+ month;
// 	postData[i].date = newDate;
// 	categoryData[i].date = newDate;
// 	postData[i].author = userData.find(user => user.id === postData[i].author);
// 	console.log('date parser works');
// }}

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

// POST route for post
// likes
app.post("/post/:id/likes",function(req,res){
	fetchJson(`${directus_apiUrl}/?filter[id][_eq]=${req.params.id}`).then(({data})=>{
		
		// let newLikes = data.length == 0? 1 : data[0].likes >= 1? 0 : data[0].likes + 1;

		const x = data[0];
        const newLikes = (x.likes >= 1) ? 0 : 1;

		if( req.body.action == 'like' && newLikes === 1){
			fetchJson(`${directus_apiUrl}/${data[0].id? data[0].id : ''}`,{
				method: POST,
				// if the post exists, update it, otherwise create it
				// method: data[0]?.id ? "PATCH" : "POST",
				headers: {"content-type":"application/json"} ,
				body: JSON.stringify({
					id: request.params.id,
					likes: newLikes,
				}) ,
			}).then((result)=>{
				console.log(result);

				if(req.body.enhanced){
					res.render('./partials/likes.ejs',{
						post :{id: req.params.id},
						likes: { newLikes},

					})
				} else{
					res.redirect(303, `/post/${req.params.id}`);
				}


			})
		} else if(req.body.action === 'like' && newLikes === 0) {
			fetchJson(`${directus_apiUrl}/${data[0].id? data[0].id : ''}`,{
				method: DELETE,
				Headers: {"content-type":"application/json"} ,
				
			}).then((result)=>{
				console.log(result);

				if(req.body.enhanced){
					res.render('./partials/likes.ejs',{
						post :{id: req.params.id},
						likes: {newLikes},

					})
				} else{
					res.redirect(303, `/post/${req.params.id}`);
				}


			})

		}
		
		
		
		// res.render("post.ejs",{})
	})
})





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

