
![mulitple-font-logo](https://user-images.githubusercontent.com/13499566/60486303-e6d22700-9c5b-11e9-8141-1f874aa7b862.png)
***
You can add multiple fonts to a text. You can pass a DOM element, or a tag name to return.

When you pass a DOM element, the text that will contain many fonts is extracted from textContent of the element. The element is modified.

If you pass a tag name, this tag will be returned with the text that you assign.

## Parameters

```typescript
text : string
mainElement : string | HTMLElement
searchByRegex : RegExp
splitByChar : string
multiple : [
    { pos:number , font: string, returnTag: string },
]
```

**Notes:**

- If you assign _mainElement_ = DOM element, you don't need declare _text_ parameter
- You need one type of search, _searchByRegex_ or _splitByChar_

## Examples

### Base HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Title</title>
    <link href="https://fonts.googleapis.com/css?family=Barriecito|Roboto:100|Rubik+Mono+One&display=swap" rel="stylesheet">  
    <style>body{font-family: 'arial';}</style>
  </head>
  <body>
    <div id="div-title">
        With text of a DOM element. Text for test multiple-fonts. Text for test.
    </div>
  </body>
</html>

```

- ### *[searchByRegex]* When you pass a _text_ and a tag name in _mainElement_

Return a new element.

```javascript
import multipleFonts from 'multiple-fonts'

const array = {
    text: 'With text and tag name. Text for test multiple-fonts. Text for test.',
    mainElement: 'h1',
    searchByRegex: /Text/gi,
    multiple: [
        { pos: 0, font: 'Barriecito', returnTag: 'p' },
        { pos: 5, font: 'Rubik Mono One', returnTag: 'span' },
        { pos: 31, font: 'Roboto ', returnTag: 'span' },
    ],
};

const element = multipleFonts(array);
document.getElementById('div-title').append(element);
```

Result:

![edit-with-text-tag-name](https://user-images.githubusercontent.com/13499566/60484476-20546380-9c57-11e9-9cc8-4d8f5aae5c0e.png)


- ### *[searchByRegex]* When you pass a DOM element in _mainElement_

The element is modified.

```javascript
import multipleFonts from 'multiple-fonts'

const array = {
    mainElement: document.getElementById('div-title'),
    searchByRegex: /Text/gi,
    multiple: [
        { pos: 0, font: 'Barriecito', returnTag: 'span' },
    ],
};

multipleFonts(array);
```

Result:

![edit-dom-element](https://user-images.githubusercontent.com/13499566/60484502-37935100-9c57-11e9-93c1-db6864f8387c.png)

- ### *[splitByChar]* When you pass a _text_ and a tag name in _mainElement_

Return a new element.

```javascript
import multipleFonts from 'multiple-fonts'

const array = {
    text: 'With text and tag name. Text for test multiple-fonts. Text for test.',
    mainElement: 'h1',
    splitByChar: ' ',
    multiple: [
        { pos: 0, font: 'Barriecito', returnTag: 'span' },
        { pos: 5, font: 'Rubik Mono One', returnTag: 'span' },
        { pos: 31, font: 'Roboto ', returnTag: 'span' },
    ],
};

const element = multipleFonts(array);
document.getElementById('div-title').append(element);
```

Result:

![edit-splitbychar-with-text-tag-name](https://user-images.githubusercontent.com/13499566/60484522-48dc5d80-9c57-11e9-9fbe-7f2c39d7c72d.png)

- ### *[splitByChar]* When you pass a DOM element in _mainElement_

The element is modified.

```javascript
import multipleFonts from 'multiple-fonts'

const array = {
    mainElement: document.getElementById('div-title'),
    splitByChar: ' ',
    multiple: [
        { pos: 1, font: 'Barriecito', returnTag: 'span' },
    ],
};

multipleFonts(array);
```

Result:

![edit-splitbychar-dom-element](https://user-images.githubusercontent.com/13499566/60484665-9062e980-9c57-11e9-8874-6a3650e51a74.png)

***

**Note:**
- You can download the file, add the script into your HTML and use it, with the same functionality, jQuery is not required, the file is in _build/_ carpet

```html
<script src="multiple-fonts.min.js" ></script>
```
