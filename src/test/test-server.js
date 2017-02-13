var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');

var should = chai.should();
var expect = require('chai').expect();
var City = require('../models/city');

chai.use(chaiHttp);

// Create the test suite and give it a name
describe('Cities Express Routes', function() {

    // Describe a test for the INDEX route
    it('Should list ALL posts on a GET to /', function(done) {

        // Create a requester that makes requests to our app
        var request = chai.request(app);

        // Make a request to get an index of posts
        request
            .get('/')
            .end(function(error, response) {

                // Check for the 200 status code (OK)
                response.should.have.status(200);

                // Check that it's html
                response.should.be.html;

                // Check that the title is correct
                response.text.should.match(/Cities/);

                // Check the title of the first post is displayed
                response.text.should.match(/Toronto/);

                // Finish the test
                done();
            });
    });

    // Describe a test for the SHOW route
    it('Should show a SINGLE post on a GET to /:id (:id=589f4291cf854541a82e65eb)', function(done) {

        // Create a requester that makes requests to our app
        var request = chai.request(app);

        // Make a request to a post
        request
            .get('/589f4291cf854541a82e65eb')
            .end(function(error, response) {

                // Check for the 200 status code (OK)
                response.should.have.status(200);

                // Check that it's html
                response.should.be.html;

                // Check that the title is correct
                response.text.should.match(/Hong Kong/);

                // Check the body text is correct
                response.text.should.match(/Ranking: 1/);

                // Finish the test
                done();
            });
    });

    // Describe a test for the EDIT route
    it('Should retrieve a SINGLE post edit on a GET to /:id (:id=589f321883c49c3bc4ca6ede)', function(done) {
        // Create a requester that makes requests to our app
        var request = chai.request(app);

        // Make a request to get the edit page
        request
        .get('/589f321883c49c3bc4ca6ede/edit')
        .end(function(error, response) {

            // Check for the 200 status code (OK)
            response.should.have.status(200);

            // Check that it's html
            response.should.be.html;

            // Check that the title is correct
            response.text.should.match(/Edit City/);

            // Check that the correct city has been returned
            response.text.should.match(/Toronto/);

            // Check that the form is there
            response.text.should.match(/Submit City/);

            done();
        });
    });

    // Describe a test for the NEW router
    it('Should retrieve a NEW post form on a GET to /new', function(done) {

        // Create a requester that makes requests to our app
        var request = chai.request(app);

        // Make a request to get /new page
        request
            .get('/new')
            .end(function(error, response) {

                // Check for the 200 status code (OK)
                response.should.have.status(200);

                // Check that it's html
                response.should.be.html;

                // Check that the title is correct
                response.text.should.match(/Add City/);

                // Check that the form is there
                response.text.should.match(/Submit City/);

                done();
            });
    });

    // Describe a test for the CREATE route
    it('Should add a SINGLE post on a POST to /', function(done) {

        // Create a requester that makes requests to our app
        var request = chai.request(app);

        // Make a request to create a new post
        request
            .post('/')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                'name': "London",
                'ranking': 12,
                'landmarks': "London Eye, Big Ben"
             })
            .end(function(error, response) {

                // Check for the 200 status code (OK)
                response.should.have.status(200);

                // Check that it's html
                response.should.be.html;

                // We should end up back at the homepage
                response.text.should.match(/Cities/);

                City.findOne({"name": "London"}, function(err, city) {
                    // Make another request to check it has been created
                    request
                        .get('/' + city._id)
                        .end(function(error, response) {
                            response.should.have.status(200);
                            response.should.be.html;
                            response.text.should.match(/London/);
                            response.text.should.match(/Ranking: 12/);
                            response.text.should.match(/Landmarks: London Eye, Big Ben/);

                            // Finish the test
                            done();
                        });
                });
            });
    });

    // Describe a test for the UPDATE route
    it('Should update a SINGLE post on a PUT to /:id (:id=589ef836440e2df3071a0d97)', function(done) {

        // Create a requester that makes requests to our app
        var request = chai.request(app);

        City.findOne({"name": "London"}, function(err, city) {
            // Make a request to update data
            request
                .put('/' + city._id)
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    'name': "Rome",
                    'ranking': 11
                })
                .end(function(error, response) {

                    // Check for the 200 status code (OK)
                    response.should.have.status(200);

                    // Check that it's html
                    response.should.be.html;

                    // Check that the post has been updated
                    response.text.should.match(/Rome/);
                    done();
                });
        });
    });

    // Describe a test for the delete route
    it('Should delete a SINGLE post on a DELETE to /:id', function(done) {

        // Create a requester that makes request to our app
        var request = chai.request(app);

        City.findOne({"name": "Rome"}, function(err, city) {
            // Make a request to delete a post
            request
                .delete('/' + city._id)
                .end(function(error, response) {

                    // Check for the 200 status code (OK)
                    response.should.have.status(200);

                    // Check that it's html
                    response.should.be.html;

                    // We should end up back at the homepage
                    response.text.should.match(/Cities/);

                    // Make another request to check it has been deleted
                    request
                        .get('/' + city.id)
                        .end(function(error, response) {

                            // Check the page DOES NOT exist
                            response.should.have.status(404);

                            // Finish the test
                            done();
                        });
                });
        });
    });
});
