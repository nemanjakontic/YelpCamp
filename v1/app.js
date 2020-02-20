var express = require("express");
var app = express();
app.set("view engine", "ejs");
var campgrounds = [
    { name: "Salmon Creek", image: "https://images.unsplash.com/photo-1582032224511-d6a8a1d21c0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" },
    { name: "Granite Hill", image: "https://images.unsplash.com/photo-1582032224511-d6a8a1d21c0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" },
    { name: "Monutain", image: "https://images.unsplash.com/photo-1582032224511-d6a8a1d21c0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" }
];

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    res.render("campgrounds", { campgrounds: campgrounds });
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Server has started!");
});