'user strict';

var template = require('es6-template-strings');
var through = require('through2');
var PluginError = require('plugin-error');

var PLUGIN_NAME = 'gulp-es6-template-resolver';

/**
 * Go through files and apply templates, based on values 
 * and tags defined in tagFile and dataFile.
 * @param {tagFile} A javascript module used for defining tags
 * @param {dataFile} A JSON file containing static values used in the website
 * @param {enc} Encryption used for dataFile, default to 'utf8'
 */

 module.exports = function(resolverObject) {
    return through.obj(function(file, enc, callback) {
        if (file.isStream())
            return callback(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
        try {
            var contents = template(file.contents.toString(), resolverObject)
        } catch (err) {
            return callback(new PluginError(PLUGIN_NAME, err));
        }

        file.contents = new Buffer(contents);
        callback(null, file);
    });
}