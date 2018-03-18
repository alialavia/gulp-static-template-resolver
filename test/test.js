'use strict';

var expect = require('chai').expect;
var File = require('vinyl');
var fs = require('fs');
describe('#templateResolver', function() {
  var content = fs.readFileSync("test/index.html", "utf8");
	it('should throw error on bad state.jsons', function() {
      // create the fake file
      var fakeFile = new File({ contents: new Buffer(content) });
      var template_resolver = require('../')('./test/defs.js', './test/state.bad.json');
      expect(() => template_resolver.write(fakeFile)).to.throw();
    });
    
	it('should throw no error on good state.jsons', function() {
      // create the fake file
      var fakeFile = new File({ contents: new Buffer(content) });
      var template_resolver = require('../')('./test/defs.js', './test/state.json');
      expect(() => template_resolver.write(fakeFile)).to.not.throw();
    });

  it('should throw no error on partial state jsons', function() {
      // create the fake file
      var fakeFile = new File({ contents: new Buffer(content) });
      var template_resolver = require('../')('./test/defs.js', './test/state.partial.json');
      expect(() => template_resolver.write(fakeFile)).to.not.throw();
    });
});