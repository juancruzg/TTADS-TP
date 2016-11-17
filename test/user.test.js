var chai = require("chai");

var controller = require("./../api/uesrs/user.controller.js");

var expect = chai.expect;

describe("Users", function() {
  it("getUsers() returns 0 when no items.", function() {
    expect(controller.getUsers()).to.equal(0);
  });
});
