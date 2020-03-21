var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment");
var seedDB = require("./seeds")

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp_v3");

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
            res.render("campgrounds/index", { campgrounds: allCampgrounds });
        }
    });
});

//CREATE
app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new");
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
    Campground.findById(req.params.id).populate("comments").exec(function(err, camp) {
        if (err) {
            console.log("greska");
        } else {
            res.render("campgrounds/show", { campground: camp });
        }
    });
});

// ===============
// COMMENTS ROUTES
// ===============

app.get("/campgrounds/:id/comments/new", function(req, res) {
    // find campground by id
    // send to template
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", { campground: campground });
        }
    });
});

app.post("/campgrounds/:id/comments", function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Server hass started!");
});