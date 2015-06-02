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
        var result = {
            elem    : 'list',
            content : body
        };

        if (ordered) {
            result.mods = {
                type: 'ordered'
            }
        }

        return result;
    },

    listitem : function (text) {

        return {
            elem    : 'list-item',
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
            elem    : 'table',
            content : [
                {
                    elem    : 'table-header',
                    content : header
                },
                {
                    elem    : 'table-body',
                    content : body
                }
            ]
        };
    },

    tablerow : function (content) {

        return {
            elem    : 'table-row',
            content : content
        };
    },

    tablecell : function (content, flags) {
        var result = {
            elem    : 'table-cell',
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

    image : function (href, title, text, params) {
        var result = {
            elem : 'image',
            url  : href,
            alt  : text,
            mods : {}
        };

        if (title) {
            result.title = title;
        }

        if (params) {

            if (params.size) {
                var size  = params.size;
                var style = 'width: ' + size.width + 'px';

                if (size.height) {
                    style += '; height: ' + size.height + 'px';
                }

                result.attrs = {
                    style: style
                };
            }

            if (params.align) {
                result.mods.align = params.align;
            }
        }

        return result;
    }
};