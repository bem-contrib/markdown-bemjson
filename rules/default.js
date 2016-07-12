const escapeHtml = require('escape-html');

module.exports = function defaultRules(options) {
    options = options || {};
    options.markdown = options.markdown || {};
    const tag = options.tag;

    return {

        // Block level

        code(code, lang, escaped) {
            const highlight = options.markdown.highlight;

            if (highlight) {
                const highlighted = highlight(code, lang);

                if (highlighted !== null && highlighted !== code) {
                    escaped = true;
                    code = highlighted;
                }
            }

            const result = {
                elem : 'blockcode',
                content : {
                    elem : 'code',
                    content : escaped ? code : escapeHtml(code),
                },
            };

            if (tag) {
                result.tag = 'pre';
                result.content.tag = 'code';
            }

            if (lang) {
                result.elemMods = {
                    lang,
                };
            }

            return result;
        },

        blockquote(quote) {
            const result = {
                elem : 'blockquote',
                content : quote,
            };

            if (tag) {
                result.tag = 'blockquote';
            }

            return result;
        },

        html(html) {
            return html;
        },

        heading(text, level) {
            const result = {
                elem : 'h' + level,
                content : text,
            };

            if (tag) {
                result.tag = 'h' + level;
            }

            return result;
        },

        hr() {
            const result = {
                elem : 'hr',
            };

            if (tag) {
                result.tag = 'hr';
            }

            return result;
        },

        list(body, ordered) {
            const result = {
                content : body,
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

        listitem(text) {
            const result = {
                elem : 'li',
                content : text,
            };

            if (tag) {
                result.tag = 'li';
            }

            return result;
        },

        paragraph(text) {
            const result = {
                elem : 'p',
                content : text,
            };

            if (tag) {
                result.tag = 'p';
            }

            return result;
        },

        table(header, body) {
            const result = {
                elem : 'table',
            };

            if (tag) {
                result.tag = 'table';
            }

            if (header) {
                const thead = {
                    elem : 'thead',
                    content : header,
                };

                if (tag) {
                    thead.tag = 'thead';
                }

                const tbody = {
                    elem : 'tbody',
                    content : body,
                };

                if (tag) {
                    tbody.tag = 'tbody';
                }

                result.content = [thead, tbody];
            } else {
                result.content = body;
            }

            return result;
        },

        tablerow(content) {
            const result = {
                content,
                elem : 'tr',
            };

            if (tag) {
                result.tag = 'tr';
            }

            return result;
        },

        tablecell(content, flags) {
            const result = {
                content,
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

        strong(text) {
            const result = {
                elem : 'strong',
                content : text,
            };

            if (tag) {
                result.tag = 'strong';
            }

            return result;
        },

        em(text) {
            const result = {
                elem : 'em',
                content : text,
            };

            if (tag) {
                result.tag = 'em';
            }

            return result;
        },

        codespan(text) {
            const result = {
                elem : 'code',
                content : text,
            };

            if (tag) {
                result.tag = 'code';
            }

            return result;
        },

        br() {
            const result = {
                elem : 'br',
            };

            if (tag) {
                result.tag = 'br';
                result.bem = false;
            }

            return result;
        },

        del(text) {
            const result = {
                elem : 'del',
                content : text,
            };

            if (tag) {
                result.tag = 'del';
            }

            return result;
        },

        link(href, title, text) {
            const result = {
                elem : 'a',
                url : href,
                content : text,
            };

            if (title) {
                result.title = title;
            }

            if (tag) {
                result.tag = 'a';
                result.attrs = {
                    href,
                };
            }

            return result;
        },

        image(href, title, text, params) {
            const result = {
                elem : 'img',
                url : href,
                alt : text,
                elemMods : {},
            };

            if (title) {
                result.title = title;
            }

            if (tag) {
                result.tag = 'img';
                result.attrs = {
                    src : href,
                    alt : text,
                };
            }

            if (params) {

                if (params.size) {
                    const size = params.size;
                    let style = 'width: ' + size.width + 'px';

                    if (size.height) {
                        style += '; height: ' + size.height + 'px';
                    }

                    result.attrs = {
                        style,
                    };
                }

                if (params.align) {
                    result.elemMods.align = params.align;
                }
            }

            return result;
        },
    };
};
