const express = require("express");
const router = express.Router();


// GET route for post
app.get("/:id",function(req,res){

	res.render("post.ejs",{})
	res.redirect(303, '/');

});


module.exports = router;