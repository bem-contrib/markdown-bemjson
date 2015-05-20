module.exports = {

    // Block level

    code : function (code, lang, escaped) {
        var result;

        if ('javascript' == lang) {
            result = JSON.parse(code);
        } else {
            result = {
                elem    : 'code',
                content : code
            };

            if (lang) {
                result.mods  = {
                    lang : 'lang'
                };
            }
        }

        return result;
    },

    blockquote : function (quote) {

        return {
            elem    : 'blockquote',
            content : quote
        }
    },

    html : function (html) {

        return html;
    },
    
    heading : function (text, level, raw) {

        return {
            elem : 'header',
            mods : {
                level : level
            },
            content : text
        }
    },

    hr : function () {

        return {
            elem : 'hr'
        }
    },

    list : function (body, ordered) {

        return {
            block : 'list',
            mix   : {
                block : 'content',
                elem  : 'list'
            },
            content : body
        }
    },

    listitem : function (text) {

        return {
            elem    : 'item',
            content : text
        }
    },

    paragraph : function (text) {

        return {
            elem    : 'p',
            content : text
        }
    },

    table : function (header, body) {

        return {
            block : 'table',
            mix   : {
                block : 'content',
                elem  : 'table'
            },
            content : [
                {
                    elem    : 'header',
                    content : header
                },
                {
                    elem    : 'body',
                    content : body
                }
            ]
        };
    },

    tablerow : function (content) {

        return {
            elem    : 'row',
            content : content
        };
    },

    tablecell : function (content, flags) {
        var result = {
            elem    : 'cell',
            content : content
        };

        if (flags.header) {
            result.elemMods = {
                role : 'header'
            };
        }

        return result;
    },

    // Inline level

    strong : function (text) {

        return {
            elem    : 'strong',
            content : text
        }
    },

    em : function (text) {

        return {
            elem    : 'em',
            content : text
        }
    },

    codespan : function (text) {

        return {
            elem    : 'code',
            content : text
        }
    },

    br : function () {

        return {
            elem : 'br'
        }
    },

    del : function (text) {

        return {
            elem    : 'del',
            content : text
        }
    },

    link : function (href, title, text) {
        var result = {
            elem    : 'link',
            url     : href,
            content : text
        };

        if (title) {
            result.title = title;
        }

        return result;
    },

    image : function (href, title, text, size) {
        var result = {
            elem : 'image',
            url  : href,
            alt  : text
        };

        if (title) {
            result.title = title;
        }

        if (size) {
            var width  = size[0];
            var height = size[1];

            result.width = width;

            if (height) {
                result.height = height;
            }
        }

        return result;
    }
};