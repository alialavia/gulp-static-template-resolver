
var template = require('es6-template-strings');
var through = require('through2');
var PluginError = require('plugin-error');
var reload = require('require-reload')(require);
// Compile template files
var fs = require('fs');
var resolve = require('path').resolve;
var PLUGIN_NAME = 'gulp-es6-template-resolver';

var helpers = {
    many: function many(ui, args) {
        //console.log({ui, args});
        var placeholders = [].slice.call(arguments, 1);
        //console.log({placeholders});
        var result = placeholders.map((x) => ui(...x));
        return result.reduce((a, b) => a + b);

    }
}

/**
- * Go through files and apply templates, based on values
- * and tags defined in tagFile and dataFile.
- * @param {tagFile} A javascript module used for defining tags
- * @param {dataFile} A JSON file containing static values used in the website
- * @param {enc} Encryption used for dataFile, default to 'utf8'
- */

module.exports = function(tagFile, dataFile, enc='utf8') {
    return through.obj(function(file, enc, callback) {
        var state = JSON.parse(fs.readFileSync(resolve(dataFile), enc));
        var tags = reload(resolve(tagFile));
        var resolverObject = Object.assign({}, helpers, tags, state);
        if (file.isStream())
            return callback(new PluginError(PLUGIN_NAME, 'Streaming not supported'));

        try {
            var contents = template(file.contents.toString(), resolverObject, { partial: true })
        } catch (err) {
            return callback(new PluginError(PLUGIN_NAME, err));
        }

        file.contents = new Buffer(contents);
        callback(null, file);
    });
}