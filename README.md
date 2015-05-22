# markdown-bemjson

Конвертирует данные из формата [markdown](https://ru.wikipedia.org/wiki/Markdown) в [bemjson](https://ru.bem.info/technology/bemjson/v2/bemjson/)

Для обратного преобразования (bemjson в markdown) используйте модуль [bemjson-markdown](https://github.com/4ok/bemjson-markdown)

## Содержание

- [Зависимости](#Зависимости)
- [Установка](#Установка)
- [Простой пример](#Простой-пример)
- [Документация](#Документация)
- [Авторы](#Авторы)
- [Идеи, замечания и пожелания](#Идеи-замечания-и-пожелания)
- [Лицензия](#Лицензия)

<a name="Зависимости"></a>
## Зависимости

- [lodash](https://www.npmjs.com/package/lodash)
- [marked](https://github.com/4ok/marked)

<a name="Установка"></a>
## Установка

__npm__: `npm i markdown-bemjson --save`

__bower__: `bower install markdown-bemjson --save`

__git__: `git clone https://github.com/bem-incubator/markdown-bemjson.git`

<a name="Простой-пример"></a>
## Простой пример

```javascript

// Классический путь
var MarkdownBemjson = require('markdown-bemjson');
var markdownBemjson = new MarkdownBemjson();

// Тоже самое, но с сахаром
var markdownBemjson = require('markdown-bemjson')();

var markdown = 'I am using __markdown__';
var bemjson  = markdownBemjson.convert(markdown);

console.log(bemjson);
/*
{
    block: 'content',
    content : [
        {
            elem    : 'p',
            content : [
            	'I am using ',
            	{
            		elem    : 'strong',
            		content : ['markdown']
        		}
    		]
        }
    ]
}
*/
```

<a name="Документация"></a>
## Документация

### @contructor([options])

__options__

Type: `object`

Настройки

*****

__options.wrapper__

Type: `object|false`  
Default: `{ block : 'content }`

Bemjson обертка, content-ом которого будет bemjson объект результата парсинга. Если значение установить в `false`, то обертки не будет.

*****

__options.markdown__

Type: `object`

Настройки для markdown парсинга.

__options.markdown.gfm__

Type: `boolean`  
Default: `true`

Включает [GitHub flavored markdown][gfm].

__options.markdown.tables__

Type: `boolean`  
Default: `true`

Включает GFM [tables][tables].
Для это опции необходимо установить опцию `gfm` в true.

__options.markdown.breaks__

Type: `boolean`  
Default: `false`

Включает GFM [line breaks][breaks].
Для это опции необходимо установить опцию `gfm` в true.

__options.markdown.pedantic__

Type: `boolean`  
Default: `false`

Пытаться максимально соответствовать `markdown.pl` и не устранять ошибки и нестандартное поведение оригинального markdown.

__options.markdown.sanitize__

Type: `boolean`  
Default: `false`

Игнорировать любой HTML-код.

__options.markdown.smartLists__

Type: `boolean`  
Default: `true`

Использовать интелектуальное поведение в отличие от оригинального markdown.

__options.markdown.smartypants__

Type: `boolean`
Default: `false`

Использовать "правильные" типографические знаки препинания, например кавычки и тире.

*****

__options.rules__

Type: `object|string`

Правила преобразования.  
Если передана строка, то она будет считаться путем до файла который возвращает правила.

#### Пример правил:

```javascript
{
    paragraph : function (text) {

        return {
            elem    : 'p',
            content : text
        }
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
}
```

#### Доступные свойства для правил:

__Block level__

- code(*string* code, *string* language)
- blockquote(*string* quote)
- html(*string* html)
- heading(*string* text, *number*  level)
- hr()
- list(*string* body, *boolean* ordered)
- listitem(*string*  text)
- paragraph(*string* text)
- table(*string* header, *string* body)
- tablerow(*string* content)
- tablecell(*string* content, *object* flags)

`flags` содержит следуюшие свойства:

```js
{
    header: true || false,
    align: 'center' || 'left' || 'right'
}
```

__Inline level__

- strong(*string* text)
- em(*string* text)
- codespan(*string* code)
- br()
- del(*string* text)
- link(*string* href, *string* title, *string* text)
- image(*string* href, *string* title, *string* text)

__[Правила применяемые по умолчанию](rules/default.js)__

### convert(markdown)

__markdown__

Type: `string`

Markdown строка

<a name="Авторы"></a>
## Авторы

- [4ok](https://github.com/4ok)

<a name="Идеи-замечания-и-пожелания"></a>
## Идеи, замечания и пожелания

Все это можно оформить в виде [issues](https://github.com/bem-incubator/markdown-bemjson/issues) на GitHub.

<a name="Лицензия"></a>
## Лицензия

[MIT](http://en.wikipedia.org/wiki/MIT_License) Лицензия

[gfm]: https://help.github.com/articles/github-flavored-markdown
[gfmf]: http://github.github.com/github-flavored-markdown/
[pygmentize]: https://github.com/rvagg/node-pygmentize-bundled
[highlight]: https://github.com/isagalaev/highlight.js
[badge]: http://badge.fury.io/js/marked
[tables]: https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#wiki-tables
[breaks]: https://help.github.com/articles/github-flavored-markdown#newlines
