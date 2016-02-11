var assert = require('assert');
var overview = require ('../routes/overview');
describe("overview get_highest_value", function() {
  it("doesn't fail when array is empty", function() {
    var results = [];
    var highest = overview.get_highest_value(results);
    assert.ok(!highest);
  }),
  it("gives highest item is only item", function() {
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

describe("describe_offset",function() {
  it("gives today with zero offset", function() {
    assert.ok( 'today' == overview.describe_offset(0));
  }),
  it("gives yesterday with (1 day) offset", function() {
    assert.ok( 'yesterday' == overview.describe_offset(1));
  }),
  it("gives day(s) ago with >1 offset", function() {
    assert.equal( '2 days ago' ,overview.describe_offset(2));
  })


});
