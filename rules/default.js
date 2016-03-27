module.exports = function (options) {
    var tag = options.tag;

    return {
    // Block level

    code : function (code, lang, escaped) {
        var result;

        // VERY STRANGE CODE, WHY DO WE PROCESS 'javascript' AS IS ?
        if ('javascript' == lang) {
            result = JSON.parse(code);
        } else {
            result = {
                elem    : 'code',
                content : code
            };

            if (tag) {
                result.tag = 'code';
            }

            if (lang) {
                result.mods  = {  // BUG: MUST BE elemMods
                    lang : 'lang' // BUG: MUST BE lang : lang
                };
            }
        }

        return result;
    },

    blockquote : function (quote) {
        var result = {
            elem    : 'blockquote',
            content : quote
        }

        if (tag) {
            result.tag = 'blockquote';
        }

        return result;
    },

    html : function (html) {

        return html;
    },

    heading : function (text, level, raw) {
        var result = {
            elem : 'header',
            mods : { // BUG: MUST BE elemMods
                level : level
            },
            content : text
        }

        if (tag) {
            result.tag = 'h' + level;
        }

        return result;
    },

    hr : function () {
        var result = {
            elem : 'hr'
        }

        if (tag) {
            result.tag = 'hr';
        }

        return result;
    },

    list : function (body, ordered) {
        var result = {
            elem    : 'list',
            content : body
        };

        if (ordered) {
            if (tag) {
                result.tag = 'ol';
            }

            result.mods = {  // BUG: MUST BE elemMods
                type: 'ordered'
            }
        } else if (tag) {
            result.tag = 'ul';
        }

        return result;
    },

    listitem : function (text) {
        var result = {
            elem    : 'list-item',
            content : text
        }

        if (tag) {
            result.tag = 'li';
        }

        return result;
    },

    paragraph : function (text) {
        var result = {
            elem    : 'p',
            content : text
        }

        if (tag) {
            result.tag = 'p';
        }

        return result;
    },

    table : function (header, body) {
        var result = {
            elem : 'table'
        };

        if (tag) {
            result.tag = 'table';
        }

        if (header) {
            var thead = {
                elem    : 'table-header',
                content : header
            };

            if (tag) {
                thead.tag = 'thead';
            }

            var tbody = {
                elem    : 'table-body',
                content : body
            };

            if (tag) {
                tbody.tag = 'tbody';
            }

            result.content = [ thead, tbody ];
        } else {
            result.content = body;
        }

        return result;
    },

    tablerow : function (content) {
        var result = {
            elem    : 'table-row',
            content : content
        };

        if (tag) {
            result.tag = 'tr';
        }

        return result;
    },

    tablecell : function (content, flags) {
        var result = {
            elem    : 'table-cell',
            content : content
        };

        if (flags.header) {
            if (tag) {
                result.tag = 'th';
            }
            result.elemMods = {
                role : 'header'
            };
        } else if (tag) {
            result.tag = 'td';
        }

        return result;
    },

    // Inline level

    strong : function (text) {
        var result = {
            elem    : 'strong',
            content : text
        }

        if (tag) {
            result.tag = 'strong';
        }

        return result;
    },

    em : function (text) {
        var result = {
            elem    : 'em',
            content : text
        }

        if (tag) {
            result.tag = 'em';
        }

        return result;
    },

    codespan : function (text) {
        var result = {
            elem    : 'code',
            content : text
        }

        if (tag) {
            result.tag = 'code';
        }

        return result;
    },

    br : function () {
        var result = {
            elem    : 'br'
        }

        if (tag) {
            result.tag = 'br';
            result.bem = false;
        }

        return result;
    },

    del : function (text) {
        var result = {
            elem    : 'del',
            content : text
        }

        if (tag) {
            result.tag = 'del';
        }

        return result;
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

        if (tag) {
            result.tag = 'a';
            result.attrs = { href : href };
        }

        return result;
    },

    image : function (href, title, text, params) {
        var result = {
            elem : 'image',
            url  : href,
            alt  : text,
            mods : {}     // BUG: MUST BE elemMods
        };

        if (title) {
            result.title = title;
        }

        if (tag) {
            result.tag = 'img';
            result.attrs = { src : href, alt : text };
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
                result.mods.align = params.align;  // BUG: MUST BE elemMods
            }
        }

        return result;
    }
}
};
