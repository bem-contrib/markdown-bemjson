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
