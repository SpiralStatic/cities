var City = require('../models/city');

function indexCities(req, res) {
    City.find({}, function(err, cities) {

    // Check for errors and return 500 if there is a problem
    if (err) return res.status(500).send(err.message);

    // Data return so now we can render
    res.render("cities/index", {
        title: "Cities",
        cities: cities
    });
});
}

function showCity(req, res) {
    // Get the city to load a single post from its mongo id
    City.findById(req.params.id, function(err, city) {

        // Check to see if post is returned
        if (!city) return res.status(404).send("Not Found");

        // Check for errors and return 500 if there is a problem
        if (err) return res.status(500).send(err.message);

        res.render("cities/show", {
            title: "City",
            city: city
        });
    });
}

function newCity(req, res) {
    // Create an empty City
    var newCity = {
        name: "",
        country: "",
        population: "",
        ranking: "",
        landmarks: ""
    };

    res.render("cities/new", {
        title: "New City",
        city: newCity
    });
}

function editCity(req, res) {
    City.findById(req.params.id, function(err, city) {

        // Check to see if post is returned
        if (!city) return res.status(404).send("Not Found");

        // Check for errors and return 500 if there is a problem
        if (err) return res.status(500).send(err.message);

        res.render("cities/edit", {
            title: "Edit City",
            city: city
        });
    });
}

function createCity(req, res) {
    City.create(req.body, function(err, city) {
        // Check for errors and return 500 if there is a problem
        if (err) return res.status(500).send(err.message);

        // Redirect the user to a GET route. We'll go back to the INDEX.
        res.redirect("/");
    });
}

function updateCity(req, res) {
    City.findByIdAndUpdate(req.params.id, req.body, function(err, city) {

        // Check for errors and return 500 if there is a problem
        if (err) return res.status(500).send(err.message);

        // Redirect the user to a GET route. We'll go back to the INDEX.
        res.redirect("/");
    });
}

function deleteCity(req, res) {
    City.findByIdAndRemove(req.params.id, function(err, city) {

        // Check for errors and return 500 if there is a problem
        if (err) return res.status(500).send(err.message);

        // Redirect to a GET request
        res.redirect("/");
    });
}

module.exports = {
    index: indexCities,
    show: showCity,
    new: newCity,
    edit: editCity,
    create: createCity,
    update: updateCity,
    delete: deleteCity
};
