var path   = require('path');
var marked = require('marked');
var _      = require('lodash');

var BLOCK_ROOT_DEFAULT = 'content';

var markdownBemjson = function(options) {

    this.convert = function (markdown) {
        var marked  = _getInitedMarked();
        var bemjson = marked(markdown);

        return _getResult(bemjson);
    };

    var _getInitedMarked = function () {
        var markdownOptions = _.assign(
            options.markdown || {},
            {
                renderer : _getRenderer(),
                output   : 'json'
            }
        );

        marked.setOptions(markdownOptions);

        return marked;
    };

    var _getRenderer = function () {
        var renderer = new marked.Renderer();
        var rules    = options.rules;
        var defaultRules = require(
            path.join(__dirname, 'rules/default.js')
        );

        if (_.isString(rules)) {
            rules = require(rules);
        }

        if (!_.isPlainObject(rules)) {
            rules = {};
        }

        return _.assign(renderer, defaultRules, rules);
    };

    var _getResult = function (bemjson) {
        var result;
        var rootBlock = _getRootBlock();

        if (rootBlock) {
            result = {
                block   : rootBlock,
                content : bemjson
            };
        } else {
            result = bemjson;
        }

        return result;
    };

    var _getRootBlock = function () {
        var rootBlock = options.rootBlock;

        if (undefined === rootBlock) {
            rootBlock = BLOCK_ROOT_DEFAULT;
        }

        return rootBlock;
    };
};

module.exports = function (options) {
    var result;

    if (!options) {
        options = {};
    }

    if (!(this instanceof markdownBemjson)) {
        result = new markdownBemjson(options);
    }

    return result;
};