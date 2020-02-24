var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost/yelp_camp");

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

/*Campground.create({
    name: "Granitte hill",
    image: "https://images.unsplash.com/photo-1582032224511-d6a8a1d21c0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    description: "This is the hude fhgfgjfd f fdg dfgdfgfdgfgdf fg fdgdfgdfg fdg fdgdf gdfg fdgfdfdgdf fdg fd fd d"
}, function(err, campground) {
    if (err) {
        console.log("Greskaaaa");
    } else {
        console.log("New campground: ");
        console.log(campground);
    }
});*/

var campgrounds = [
    { name: "Salmon Creek", image: "https://images.unsplash.com/photo-1582032224511-d6a8a1d21c0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" },
    { name: "Granite Hill", image: "https://images.unsplash.com/photo-1582032224511-d6a8a1d21c0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" },
    { name: "Monutain", image: "https://images.unsplash.com/photo-1582032224511-d6a8a1d21c0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" },
    { name: "Salmon Creek", image: "https://images.unsplash.com/photo-1582032224511-d6a8a1d21c0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" },
    { name: "Granite Hill", image: "https://images.unsplash.com/photo-1582032224511-d6a8a1d21c0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" },
    { name: "Monutain", image: "https://images.unsplash.com/photo-1582032224511-d6a8a1d21c0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" },
    { name: "Salmon Creek", image: "https://images.unsplash.com/photo-1582032224511-d6a8a1d21c0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" },
    { name: "Granite Hill", image: "https://images.unsplash.com/photo-1582032224511-d6a8a1d21c0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" }
];

////////////////////////////////////////////////////////////////

app.get("/", function(req, res) {
    res.render("landing");
});

//INDEX
app.get("/campgrounds", function(req, res) {
    //res.render("campgrounds", { campgrounds: campgrounds });
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log("greska");
        } else {
            res.render("index", { campgrounds: allCampgrounds });
        }
    });
});

//CREATE
app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
});

//NEW
app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCamp = { name: name, image: image, description: description };
    //campgrounds.push(newCamp);
    Campground.create(newCamp, function(err, newly) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });

});


//SHOW
app.get("/campgrounds/:id", function(req, res) {
    //res.send("SHOW");
    //var id = req.params.id;
    Campground.findById(req.params.id, function(err, camp) {
        if (err) {
            console.log("greska");
        } else {
            res.render("show", { campground: camp });
        }
    });
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Server hass started!");
});