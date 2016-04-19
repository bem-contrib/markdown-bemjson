# История изменений

## 3.0.2

- Исправлена команда npm test -> npm run lint
- Обнавлена версия "eslint" до 2.8.0
- Добавлена секция "engine" в package.json
- Обнавлена версия "markdown-converter" до 0.2.2

## 3.0.1

- Поправлен README.md

## 3.0.0

- Код переписан на ES6 (Node.js >= 4)
- Новый code style — https://github.com/4ok/eslint-config-4ok (измененный https://github.com/airbnb/javascript)
- Убран сахар для создании объекта, теперь его можно создать только через **new**
- Удален lodash из npm зависимостей

## 2.0.0

Поправлены баги описания модификаторов для элементов `mods -> elemMods`

*****

Изменены названия элементов. Теперь они соответствуют html тэгам:

- `header_level_* -> h*`
- `list_type_* -> ol/ul`
- `list-item -> li`
- `table-header -> thead`
- `table-body -> tbody`
- `table-row -> tr`
- `table-cell_role_* -> td/th`
- `table-header -> thead`
- `link -> a`
- `image -> img`
- `link -> a`
- `link -> a`

Весь код вставенный через ` ``````<lang>` теперь эскейпится и оборачивается элементами `blockcode` + `code`:

```
elem    : 'blockcode',
content : {
    elem    : 'code',
    content : escaped ? code : escape(code)
}
```

До этого конструкция:

```
`` `javascript
{
    key : value
    ...
    ...
}
`` `
```

Вставляла json как есть, предварительно прогнав через `JSON.parse`

*****

Добавлена опция markdown.highlight

__options.markdown.highlight__

Type: `function`

A function to highlight code blocks. See https://github.com/chjj/marked#highlight

## 1.0.0

Добавлена опция tag:

__options.tag__

Type: `boolean`
Default: `false`

Флаг для контроля вывода в результирующий `BEMJSON` поля `tag` с HTML-тегами по умолчанию.


## 0.3.0

Парсинг markdown заменен с модуля [marked](https://www.npmjs.com/package/marked) на модуль [markdown-converter](https://www.npmjs.com/package/markdown-converter). [markdown-converter](https://www.npmjs.com/package/markdown-converter) является fork-ом [marked](https://www.npmjs.com/package/marked), в связи с тем что последний довольно плохо поддерживается, было принято решение развивать модуль отдельно.
 
**Что нового**

- Добавлена возможность для изображений указывать размер и выравнивание:
 
- Добавлена возможность указать для изображения размер и выравнивание:
 
 ```markdown
 ![alt](http://image.jpg):center:200x100
 ```

## 0.2.0

Добавлена настройка "wrapper", которая заменила настройку "rootBlock".

> __options.wrapper__
>
> Type: `object|false`  
> Default: `{ block : 'content }`
>
> Bemjson обертка, content-ом которого будет bemjson объект результата парсинга. Если значение установить в `false`, то обертки не будет.

## 0.1.0

Добавлен сахар для создания объекта.

Теперь объект можно создать следующим образом

```javascript
var markdownBemjson = require('markdown-bemjson')();
```
