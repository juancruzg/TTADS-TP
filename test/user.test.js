var chai = require("chai");
var chaiHttp = require('chai-http');
var http = require('http');

chai.use(chaiHttp);

var expect = chai.expect;

describe("Users", function() {
  chai.request('http://localhost:9000').get('/api/users').end(function (err, res) {
    it("getUsers() returns 0 when no items.", function(done) {

    });
  });
});
