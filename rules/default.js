var escape = require('escape-html');

module.exports = function (options) {
    var tag = options.tag;

    options.markdown = options.markdown || {};

    return {

        // Block level

        code : function (code, lang, escaped) {
            var highlight = options.markdown.highlight;

            if (highlight) {
                var highlighted = highlight(code, lang);

                if (highlighted != null && highlighted !== code) {
                    escaped = true;
                    code = highlighted;
                }
            }

            var result = {
                elem : 'blockcode',
                content : {
                    elem : 'code',
                    content : escaped ? code : escape(code)
                }
            };

            if (tag) {
                result.tag = 'pre';
                result.content.tag = 'code';
            }

            if (lang) {
                result.elemMods  = {
                    lang : lang
                };
            }

            return result;
        },

        blockquote : function (quote) {
            var result = {
                elem : 'blockquote',
                content : quote
            };

            if (tag) {
                result.tag = 'blockquote';
            }

            return result;
        },

        html : function (html) {

            return html;
        },

        heading : function (text, level) {
            var result = {
                elem : 'h' + level,
                content : text
            };

            if (tag) {
                result.tag = 'h' + level;
            }

            return result;
        },

        hr : function () {
            var result = {
                elem : 'hr'
            };

            if (tag) {
                result.tag = 'hr';
            }

            return result;
        },

        list : function (body, ordered) {
            var result = {
                content : body
            };

            if (ordered) {
                result.elem = 'ol';

                if (tag) {
                    result.tag = 'ol';
                }
            } else {
                result.elem = 'ul';

                if (tag) {
                    result.tag = 'ul';
                }
            }

            return result;
        },

        listitem : function (text) {
            var result = {
                elem : 'li',
                content : text
            };

            if (tag) {
                result.tag = 'li';
            }

            return result;
        },

        paragraph : function (text) {
            var result = {
                elem : 'p',
                content : text
            };

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
                    elem : 'thead',
                    content : header
                };

                if (tag) {
                    thead.tag = 'thead';
                }

                var tbody = {
                    elem : 'tbody',
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
                elem : 'tr',
                content : content
            };

            if (tag) {
                result.tag = 'tr';
            }

            return result;
        },

        tablecell : function (content, flags) {
            var result = {
                content : content
            };

            if (flags.header) {
                result.elem = 'th';

                if (tag) {
                    result.tag = 'th';
                }
            } else {
                result.elem = 'td';

                if (tag) {
                    result.tag = 'td';
                }
            }

            return result;
        },

        // Inline level

        strong : function (text) {
            var result = {
                elem : 'strong',
                content : text
            };

            if (tag) {
                result.tag = 'strong';
            }

            return result;
        },

        em : function (text) {
            var result = {
                elem : 'em',
                content : text
            };

            if (tag) {
                result.tag = 'em';
            }

            return result;
        },

        codespan : function (text) {
            var result = {
                elem : 'code',
                content : text
            };

            if (tag) {
                result.tag = 'code';
            }

            return result;
        },

        br : function () {
            var result = {
                elem : 'br'
            };

            if (tag) {
                result.tag = 'br';
                result.bem = false;
            }

            return result;
        },

        del : function (text) {
            var result = {
                elem : 'del',
                content : text
            };

            if (tag) {
                result.tag = 'del';
            }

            return result;
        },

        link : function (href, title, text) {
            var result = {
                elem : 'a',
                url : href,
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
                elem : 'img',
                url : href,
                alt : text,
                elemMods : {}
            };

            if (title) {
                result.title = title;
            }

            if (tag) {
                result.tag = 'img';
                result.attrs = {
                    src : href,
                    alt : text
                };
            }

            if (params) {

                if (params.size) {
                    var size = params.size;
                    var style = 'width: ' + size.width + 'px';

                    if (size.height) {
                        style += '; height: ' + size.height + 'px';
                    }

                    result.attrs = {
                        style : style
                    };
                }

                if (params.align) {
                    result.elemMods.align = params.align;
                }
            }

            return result;
        }
    }
};
