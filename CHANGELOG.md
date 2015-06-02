# История изменений

## 0.1.0

Добавлен сахар для создания объекта.

Теперь объект можно создать следующим образом

```javascript
var markdownBemjson = require('markdown-bemjson')();
```

## 0.2.0

Добавлена настройка "wrapper", которая заменила настройку "rootBlock".

> __options.wrapper__
>
> Type: `object|false`  
> Default: `{ block : 'content }`
>
> Bemjson обертка, content-ом которого будет bemjson объект результата парсинга. Если значение установить в `false`, то обертки не будет.

## 0.3.0

Парсинг markdown заменен с модуля [marked](https://www.npmjs.com/package/marked) на модуль [markdown-converter](https://www.npmjs.com/package/markdown-converter). [markdown-converter](https://www.npmjs.com/package/markdown-converter) является fork-ом [marked](https://www.npmjs.com/package/marked), в связи с тем что последний довольно плохо поддерживается, было принято решение развивать модуль отдельно.
 
**Что нового**

- Добавлена возможность для изображений указывать размер и выравнивание — ![alt](http://image.jpg)**:center:200x100** 
