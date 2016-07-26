const markdownConverter = require('markdown-converter');

const DEFAULT_WRAPPER = {
    block : 'content',
};

module.exports = class MarkdownBemjson {

    constructor(options) {
        this._options = options || {};
    }

    convert(markdownStr) {
        const marked = this._getInitedMarked();
        const bemjson = marked(markdownStr);

        return this._getResult(bemjson);
    }

    _getInitedMarked() {
        const markdownOptions = Object.assign({
            renderer : this._getRenderer(),
            output : 'json',
        }, this._options.markdown || {});

        markdownConverter.setOptions(markdownOptions);

        return markdownConverter;
    }

    _getRenderer() {
        const renderer = new markdownConverter.Renderer();
        const rulesPath = './rules/default.js';
        // eslint-disable-next-line global-require
        const defaultRules = require(rulesPath)(this._options);
        let rules = this._options.rules;

        if (typeof rules === 'string') {
            // eslint-disable-next-line global-require
            rules = require(rules)(this._options);
        }

        return Object.assign(renderer, defaultRules, rules);
    }

    _getResult(bemjson) {
        const wrapper = this._getWrapper();
        let result;

        if (wrapper) {
            result = wrapper;
            result.content = bemjson;
        } else {
            result = bemjson;
        }

        return result;
    }

    _getWrapper() {
        const result = (this._options.wrapper === undefined)
            ? DEFAULT_WRAPPER
            : this._options.wrapper;

        if (result !== false && typeof result !== 'object') {
            const error = 'Wrapper must be plain object or false';

            throw new Error(error);
        }

        return result;
    }
};
