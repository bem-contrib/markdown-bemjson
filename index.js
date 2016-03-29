var path = require('path');
var markdown = require('markdown-converter');
var _  = require('lodash');

var DEFAULT_WRAPPER = {
    block : 'content'
};

var MarkdownBemjson = function(options) {

    var _getWrapper = function () {
        var result = options.wrapper;

        if (result === undefined) {
            result = DEFAULT_WRAPPER;
        }

        if (result !== false && !_.isPlainObject(result)) {
            var error = 'Wrapper must be plain object or false';

            throw new Error(error);
        }

        return result;
    };

    var _getResult = function (bemjson) {
        var result;
        var wrapper = _getWrapper();

        if (wrapper) {
            result = wrapper;
            result.content = bemjson;
        } else {
            result = bemjson;
        }

        return result;
    };

    var _getRenderer = function () {
        var renderer = new markdown.Renderer();
        var rules = options.rules;
        var defaultRules = require(path.join(__dirname, './rules/default.js'))(options);

        if (_.isString(rules)) {
            rules = require(rules)(options);
        }

        if (!_.isPlainObject(rules)) {
            rules = {};
        }

        return _.assign(renderer, defaultRules, rules);
    };

    var _getInitedMarked = function () {
        var markdownOptions = _.assign(
            options.markdown || {},
            {
                renderer : _getRenderer(),
                output   : 'json'
            }
        );

        markdown.setOptions(markdownOptions);

        return markdown;
    };

    this.convert = function (markdownStr) {
        var marked  = _getInitedMarked();
        var bemjson = marked(markdownStr);

        return _getResult(bemjson);
    };
};

module.exports = function (options) {
    var result;

    if (options === undefined) {
        options = {};
    }

    if (!_.isPlainObject(options)) {
        var error = 'Options should be a simple object';

        throw new Error(error);
    }

    if (!(this instanceof MarkdownBemjson)) {
        result = new MarkdownBemjson(options);
    }

    return result;
};
