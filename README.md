# markdown-bemjson

Конвертирует данные из формата [markdown][markdown] в [bemjson][bemjson]

Для обратного преобразования (bemjson в markdown) используйте модуль [bemjson-markdown](https://github.com/4ok/bemjson-markdown)

## Содержание

- <a href="#dependencies">Зависимости</a>
- <a href="#installation">Установка</a>
- <a href="#example">Простой пример</a>
- <a href="#manual">Документация</a>
- <a href="#authors">Авторы</a>
- <a href="#issues">Идеи, замечания и пожелания</a>
- <a href="#license">Лицензия</a>

### Дополнительная информация
- [История изменений][changelog]

<a name="dependencies"></a>

## Зависимости

- [escape-html][escape-html]
- [markdown-converter][markdown-converter]

<a name="installation"></a>

## Установка

__npm__

```bash
npm i markdown-bemjson --save
```

__git__

```bash
git clone https://github.com/bem-contrib/markdown-bemjson.git
```

<a name="example"></a>

## Простой пример

```javascript

const MarkdownBemjson = require('markdown-bemjson');
const markdownBemjson = new MarkdownBemjson();

const markdown = 'I am using __markdown__';
const bemjson  = markdownBemjson.convert(markdown);

console.log(bemjson);
```
В результате получим следующий bemjson:

```json
{
    "block": "content",
    "content" : [
        {
            "elem" : "p",
            "content" : [
                "I am using ",
                {
                    "elem" : "strong",
                    "content" : ["markdown"]
                }
            ]
        }
    ]
}
```

<a name="manual"></a>

## Документация

### @contructor([options])

__options__

Type: `object`

Настройки

*****

__options.isEscapeHtml__

Type: `boolean`  
Default: `true`

Экранировать html или нет. Если установить опцию в `false` то для каждого текстового узла будет добавлена обертка `{ html: ... }`. Подробнее об это можно почитать [тут](https://github.com/bem/bem-xjst/blob/master/docs/ru/3-api.md#%D0%AD%D0%BA%D1%80%D0%B0%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5)   

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

__options.markdown.highlight__

Type: `function`

A function to highlight code blocks. See https://github.com/chjj/marked#highlight

*****

__options.rules__

Type: `function|string`

Правила преобразования.  
Если передана строка, то она будет считаться путем до файла который возвращает правила.

#### Пример правил:

```javascript
{
    paragraph() {
        return {
            elem : 'p',
            content : text
        }
    },

    heading() {
        return {
            elem : 'h' + level,
            content : text
        }
    }
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

__[Правила применяемые по умолчанию][default-rules]__

*****

__options.tag__

Type: `boolean`
Default: `false`

Флаг для контроля вывода в результирующий `BEMJSON` поля `tag` с HTML-тегами по умолчанию.

### convert(markdown)

__markdown__

Type: `string`

Markdown строка

<a name="authors"></a>

## Авторы

- [4ok][4ok]

<a name="issues"></a>

## Идеи, замечания и пожелания

Все это можно оформить в виде [issues][issues] на GitHub.

<a name="license"></a>

## Лицензия

[MIT][mit] Лицензия

[changelog]: /CHANGELOG.md
[escape-html]: https://github.com/component/escape-html
[markdown-converter]: https://github.com/4ok/markdown-converter
[markdown]: https://ru.wikipedia.org/wiki/Markdown
[bemjson]: https://ru.bem.info/technology/bemjson/v2/bemjson/
[bemjson-markdown]: https://github.com/4ok/bemjson-markdown
[gfm]: https://github.github.com/gfm/
[highlight]: https://github.com/isagalaev/highlight.js
[tables]: https://help.github.com/articles/organizing-information-with-tables/
[breaks]: https://help.github.com/articles/github-flavored-markdown#newlines
[issues]: https://github.com/bem-contrib/markdown-bemjson/issues
[4ok]: https://github.com/4ok
[mit]: http://en.wikipedia.org/wiki/MIT_License
[default-rules]: rules/default.js
