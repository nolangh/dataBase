//index.js
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

//setup view
app.set("views", "./views");
app.set("view engine", "pug");

const mongoose = require("mongoose");
const dbConnectionString = "mongodb://localhost/inclass";
mongoose.connect(dbConnectionString);

const db = mongoose.connection;

const restaurantSchema = new mongoose.Schema({
	address: Object,
	borough: String,
	cuisine: String,
	grades: Array,
	name: String,
	restaurant_id: String,
});

const restaurants = mongoose.model("Restaurant", restaurantSchema);

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
	console.log("db connected");
});

app.get("/restaurants", (req, res) => {
	restaurants
		.find()
		.limit(5)
		.then((restaurants) => {
			console.log(restaurants);
			res.render("restaurants", {
				pageTitle: "List of Restaurants",
				restaurants: restaurants,
			});
		});
});

app.get("/restaurants/:id", (req, res) => {
	const id = req.params.id;
	restaurants.findOne({ restaurant_id: id }).then((data) => {
		console.log(data);
		res.render("single", {
			pageTitle: "List of Restaurant",
			restaurant: data,
			name: "Food",
		});
	});
});

app.post("/cuisine/:id", (req, res) => {});

app.listen(port, () => {
	console.log(`server is listening at http://localhost:${port}`);
});
