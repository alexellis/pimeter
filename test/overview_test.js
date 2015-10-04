var assert = require('assert');
var overview = require ('../routes/overview');
describe("overview get_highest_value", function() {
  it("doesn't fail when array is empty", function() {
    var results = [];
    var highest = overview.get_highest_value(results);
    assert.ok(!highest);
  }),
  it("highest item is only item", function() {
    var results = [{total:0}];
    var highest = overview.get_highest_value(results);
    assert.ok(highest == results[0]);
  }),
  it("finds highest item out of two", function() {
    var results = [{total:0}, {total:1}];
    var highest = overview.get_highest_value(results);
    assert.ok(highest == results[1]);
  }),
  it("finds highest item out of three when it's the middle item", function() {
    var results = [{total:0}, {total:2}, {total:1}];
    var highest = overview.get_highest_value(results);
    assert.ok(highest == results[1]);
  })

});
