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

// functions//

// date parser
const datePars = function(){ // ask how to implement this function and fix the post data
	for(var i = 0; i < postData.length;i++){
	const parsedDate = new Date(postData[i].date),
	day = parsedDate.getDate(),
	options = { month: "short" }, // De maand moet kort geschreven zijn
	month = Intl.DateTimeFormat("nl-NL", options).format(parsedDate.getMonth() + 1),
	newDate = day + ''+ month;
	postData[i].date = newDate;
	categoryData[i].date = newDate;
	postData[i].author = userData.find(user => user.id === postData[i].author);
	console.log('date parser works');
	return(postData)
}}

// page views 

const views = function(){
	if (!app.locals.pageViews[postId]) {
		app.locals.pageViews[postId] = 1;
	} else {
		app.locals.pageViews[postId]++;
	}
}



// GET route for index
app.get("/",function(req,res){
	Promise.all([
		fetchJson(postsUrl),
		fetchJson(usersUrl),
		fetchJson(categoryUrl)
	])
	.then(([postData,userData,categoryData]) => {

		// all the other functions
		postData = datePars(postData); 

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
	Promise.all([
		fetchJson(`${apiUrl}/posts/${postId}`),
		fetchJson(categoriesUrl),
		fetchJson(`${directus_url}?filter[id][_eq]=${request.params.id}`),
	])
		.then(([postData, categoryData, directusData]) => {
			
			// functions //
			//date parser
			postData = datePars(postData); 
			
			// page views detection // can be used to show if a page has already been visited
			views(postId);
			
			response.render("posts.ejs", {
				post: postData,
				categories: categoryData,
				direct: directusData.data.length ? directusData.data[0] : false,
			});
			// response.render("header.ejs",{post: postData})

			console.log("post succes");
		})
		.catch((error) => {
			// Handle error if fetching data fails
			console.error("Error fetching data:", error);
			response.status(404).send("Post not found");
		});

});

// POST route for post
// likes
app.post("/post/:id/likes",function(req,res){
	fetchJson(`${directus_apiUrl}/?filter[id][_eq]=${req.params.id}`).then(({data})=>{
		
		// let newLikes = data.length == 0? 1 : data[0].likes >= 1? 0 : data[0].likes + 1;

		const x = data[0];
        const newLikes = (x.likes >= 1) ? 0 : 1;
		const payload = {
			headers: {"content-type":"application/json"}
		}
		if( req.body.action == 'like' && newLikes === 1){
			payload.method = 'POST'
			payload.body = JSON.stringify({
				id: request.params.id,
				likes: newLikes,
			})
		} else if(req.body.action === 'like' && newLikes === 0) {
			payload.method = 'DELETE'
		}

		fetchJson(`${directus_apiUrl}/${data[0].id? data[0].id : ''}`, payload).then((result)=>{
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
		
	})
});

// shares
app.post("/post/:id/shares",function(req,res){
	fetchJson(`${directus_apiUrl}/?filter[id][_eq]=${req.params.id}`).then(({data})=>{
		
		// need to be changed to a function that copies the url //
		// let newShares = data.length > 0 ? data[0].shares + 1 : 1;

		const x = data[0];
        const newLikes = (x.likes >= 1) ? 0 : 1;
		const payload = {
			headers: {"content-type":"application/json"}
		}
		if( req.body.action == 'share' && newShares === 1){
			payload.method = 'POST'
			payload.body = JSON.stringify({
				id: request.params.id,
				likes: newLikes,
			})
		 

			fetchJson(`${directus_apiUrl}/${data[0].id? data[0].id : ''}`, payload).then((result)=>{
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
		}
	})
});


// GET route for category list
app.get("/categories",function(req,res){
	fetchJson(categoriesUrl).then((categoriesData)=>{
		res.render("category.ejs",{

			// cat : categories
			cat: categoriesData,
		})

	})

});

// GET route for individual category 
app.get("/category/:slug",function(req,res){
	fetchJson(`${categoriesUrl}&slug=${req.params.slug}`).then((categoriesData)=>{
		fetchJson(`${postsUrl}&categories=${categoriesData[0].id}`).then((postData)=>{
			// function
			postData = datePars(postData); 

			res.render("category.ejs",{
				post: postData,
			})

		})
	} )


});

// GET route for author list
app.get("/authors",function(req,res){
	promises.all([
		fetchJson(usersUrl),
		fetchJson(categoriesUrl)
	]).then(([userData,categoriesData])=>{
		res.render("authors.ejs",{
			user:userData,
			// cat : categories
			cat: categoriesData,
		})
	})
	
	
	

});

// GET route for individual author 
app.get("/author/:id",function(req,res){
	promises.all([
		fetchJson(`${postsUrl}&author=${req.params.id}`),
		fetchJson(`${usersUrl}&include=${req.params.id}`),
		fetchJson(categoriesUrl),
	]).then(([postData,userData,categoriesData])=>{
		// functions

		res.render("authors.ejs",{
			post: postData,
			user: userData,
			// cat : categories
			cat: categoriesData,
		})
	})
});

// ports //
app.set("port", process.env.PORT || 808);

app.listen(app.get("port"), function(){
	console.log(`Test link ${app.get("port")}`);
	console.log("Server listening on port " + '👉 ' + `http://localhost:${app.get("port")}`+ ' 👈');
});

