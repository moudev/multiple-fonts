![multiple-fonts](https://user-images.githubusercontent.com/13499566/64492723-4e948780-d234-11e9-8351-3b071b114f7c.png)



***
[multiple-fonts](https://www.npmjs.com/package/multiple-fonts) allows you to add multiple fonts to a text of your site.

mutiple-fonts consists of searching certain words or dividing text by a character. The response of the search is an array, each of the positions of the result can have a specific font, in addition to each position of the result can be specified the name of an element HTML that will contain the text of the position.

**Textual example of a use case;**

You have a blog in which the title of each publication is different, with only once font style, but you want to emphasize a piece of the text, all this data are dynamic from a database, you can't add a tag to remark the text manually.

mulitiple-fonts realize the search of the text that you specify in your JS code and remark it for you in a dynamic form, is possible that the text appears more of one time in the search, you can assign a different font style to each of the results.

![Screenshot-2019-9-7 Title(1)](https://user-images.githubusercontent.com/13499566/64482923-8f01f000-d1b7-11e9-953c-b5f6b51ab508.png)

## Ways to implement multiple-fonts;

Exist two forms that you can use;

 - **Specify the text to use and the name of a tag HTML that will contain the text passed in the parameters.**
-  **Specify an existing DOM element.**

Variants:
- **Specify a regular expression that will search in the text.**
- **Specify a character to divide the text.**

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

- `text`

The text that will be used to add multiple fonts to the search result

- `mainElement`

HTML element that will be returned modified and with fonts applied. A parameter that could be a string or an HTML element.

In the case that the parameter is a string, this means that an HTML element will be created and that will be returned to add where you want in your site.

When the parameter is a DOM element is assumed that is necessary to extract the text from the element and later the search to applicated the fonts.

- `searchByRegex`

A parameter that is a regular expression. This parameter is responsible to realize the search of the expression in the text. When a coincidence is found its position is saved to later applied the font.

![64483302-8c55c980-d1bc-11e9-8cb1-701c846bb8e9](https://user-images.githubusercontent.com/13499566/64492344-3e7aa900-d230-11e9-8013-6ac21661a51c.png)


- `splitByChar`

A parameter that is a character by which the text will be divided, later when the division is done an array is returned to later add a font style to the positions of the coincidences. An example could be; divide the text by space(' ') character, and the text of the position 3 of the array apply a font style and to the position 5 add another font style.

- `multiple`

An array responsible to save the fonts that will be added. An array that contains objects inside, each element have 3 keys.

```typescript
{ pos: 0, font: 'Rubik Mono One', returnTag: 'span' },
```

`pos`: The position of the text that will be applied with a font
`font`: Name of the font that will be applied
`returnTag`: Name of the HTML element that will contain the text of its position

Example of the resulting element that contains the text found;

```HTML
<span style="font-family: Rubik Mono One">NEW</span>
```
## Information to consider

**Note:** To use multiple-fonts, you can use the file found in the carpet `/build/multiple-fonts.js` and add it in your HTML file. JQuery is not required.

**Considerations in both types of search:** 

- Is probable that the coincidences are less than the length of the array `multiple`, but this not import because the assignation of the fonts is by the order that they are found and not exist inconvenience that a text doesn't have a font assigned.

```typescript
const array = {
  text: 'With text and tag name.',

  searchByRegex: /text/gi,
  multiple: [
    { pos: 0, font: 'Barriecito', returnTag: 'p' }, // --> Assigned
    { pos: 5, font: 'Rubik Mono One', returnTag: 'span' }, // --> Not assigned
    { pos: 31, font: 'Roboto ', returnTag: 'span' }, // --> Not assigned
  ],
};
```

- When exist more coincidences than the length of `multiple`, the fonts are assigned in the order that they are found, for example; are 5 coincidences y only two font in the multiple array, so to the first coincidence the first font specified is applied and the rest of the coincidences the second font specified in the multiple array.

```typescript
const array = {
  text: 'With text and tag name. Text for test multiple-fonts. Text for test.',
  
  searchByRegex: /text/gi,
  multiple: [
    { pos: 0, font: 'Barriecito', returnTag: 'p' }, // --> Assigned to the first coincidence
    { pos: 5, font: 'Rubik Mono One', returnTag: 'span' }, // --> Assigned to the rest of the coincidences
  ],
};
```
## Examples

### Specify the text to use and the name of the HTML element that will contain the text entered

Type of text search: **searchByRegex** 

**To consider in searchByRegex** : When the type is searchByRegex the key "pos" f the object array `multiple` is not considered because not import the moment when the coincidence is found.

**Use case:** Pass a text as a parameter, creating an element `<h1>`  to be returned by multiple-fonts and added to the element `<div id='div-title'>`. Find the word "text" in all the text ignoring that the text is in uppercase or lowercase. The first coincidence will have the font "Barriecito" and the text will be inside the element  `<p>`, the same to the coincidence 2 and 3 in its respective element with its font style assigned.

**Example;**
```HTML
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>multiple-fonts Demo</title>
    <link href="https://fonts.googleapis.com/css?family=Barriecito|Roboto:100|Rubik+Mono+One&display=swap" rel="stylesheet">  
    <style>body{font-family: 'arial'; background: white; color: black; font-size: 20px;}</style>
  </head>
  <body>
    <br><br><br>
    <div id="div-title">
       
    </div>
    <script src="multiple-fonts.min.js" type="text/javascript"></script>
    <script type="text/javascript">
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
    </script>
  </body>
</html>
```
HTML result of the `<div id='div-title'>`;

```HTML
<div id="div-title">
    <h1>
      With  
       <p style="font-family: Barriecito;">Text</p>  
       and tag name.  
       <span style="font-family: Rubik Mono One;">Text</span>  
       for test multiple-fonts.  
       <span style="font-family: Roboto;">Text</span>  
       for test. 
    </h1>
</div>
```

Visual result:
![Screenshot-2019-9-8 multiple-fonts Demo](https://user-images.githubusercontent.com/13499566/64492444-2192a580-d231-11e9-9a32-b88dfb553cb9.png)



### Specify the text to use and the name of the HTML element that will contain the text entered

Type of text search: **splitByChar** 

**To consider in splitByChar** : When the type is splitByChar, the key `pos` of the object array  `multiple` is taken into consideration because it contains the position by which the font can be assigned, remember that when the result of the division is an array. Also is probable that the key `pos` has a value higher than the length of the array that contains the text divided, but not exist inconvenient that this pass because if `pos` is longer then the font will be assigned to the last position of the array divided.

```typescript
const array = {
  text: 'With text and tag name text. Tag text.',
  //      [0]  [1] [2] [3] [4]   [5]  [6] [7]
  splitByChar: ' ',
  multiple: [
    { pos: 0, font: 'Barriecito', returnTag: 'p' },// --> Assigned to [0]
    { pos: 5, font: 'Rubik Mono One', returnTag: 'span' },// --> Assigned to [5]
    { pos: 31, font: 'Roboto ', returnTag: 'span' },// --> Assigned to [7]
  ],
};

```

**Use case:** Pass a text as a parameter, creating an element  `<h1>` to be returned by multiple-fonts and added to the element `<div id='div-title'>`. Dividing the text by space(' ') character, an array is returned with each word in a position, and later assign a font in each position according to the value of `pos`. To the position [0] of the text divided the font  "Barriecito" is assigned, to the position [5] the font "Roboto" is assigned, in this case, the text divided has a length of 12, but in the array `multiple` is specified that the position [31] will have the font "Rubik Mono One", but the position [31] not exist in the array of the text divided, therefore the font is applied to the last position of the text divided.

**Example;**

```typescript
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>multiple-fonts Demo</title>
    <link href="https://fonts.googleapis.com/css?family=Barriecito|Roboto:100|Rubik+Mono+One&display=swap" rel="stylesheet">  
    <style>body{font-family: 'arial'; background: white; color: black; font-size: 20px;}</style>
  </head>
  <body>
    <br><br><br>
    <div id="div-title">

    </div>
    <script src="multiple-fonts.min.js" type="text/javascript"></script>
    <script type="text/javascript">
     const array = {
       text: 'With text and tag name. Text for test multiple-fonts. Text for test.',
       mainElement: 'h1',
       splitByChar: ' ',
       multiple: [
         { pos: 0, font: 'Barriecito', returnTag: 'span' },
         { pos: 5, font: 'Roboto', returnTag: 'span' },
         { pos: 31, font: 'Rubik Mono One', returnTag: 'span' },
       ],
     };

     const element = multipleFonts(array);
     document.getElementById('div-title').append(element);
    </script>
  </body>
</html>
```
HTML result of the `<div id='div-title'>`;

```HTML
<div id="div-title">
  <h1>
    <span style="font-family: Barriecito;">With</span> 
    text and tag name. 
    <span style="font-family: Roboto;">Text</span> 
    for test multiple-fonts. Text for 
    <span style="font-family: Rubik Mono One;">test.</span> 
  </h1>
</div>
```
Visual result:
![Screenshot-2019-9-8 multiple-fonts Demo(1)](https://user-images.githubusercontent.com/13499566/64492397-9ca78c00-d230-11e9-9aea-044d3f5b685d.png)


***
### Specify an existing DOM element

Type of text search: **searchByRegex** 

**Use case:** Pass an existing HTML element as a parameter to extract its text and make the assign of its correspondent font, in this case, the element `<div id='div-title'>` is to which the text is extracted, later to do the search of the word "text" ignoring that the text is in uppercase or lowercase and next making the assign of the fonts, finishing with the update of the element `<div id='div-title'>`

**Example;**
```HTML
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>multiple-fonts Demo</title>
    <link href="https://fonts.googleapis.com/css?family=Barriecito|Roboto:100|Rubik+Mono+One&display=swap" rel="stylesheet">  
    <style>body{font-family: 'arial'; background: white; color: black; font-size: 20px;}</style>
  </head>
  <body>
    <br><br><br>
    <div id="div-title">
      With text of a DOM element. Text for test multiple-fonts. Text for test.
    </div>
    <script src="multiple-fonts.min.js" type="text/javascript"></script>
    <script type="text/javascript">
     const array = {
       mainElement: document.getElementById('div-title'),
       searchByRegex: /Text/gi,
       multiple: [
         { pos: 0, font: 'Barriecito', returnTag: 'span' },
         { pos: 5, font: 'Rubik Mono One', returnTag: 'span' },
         { pos: 31, font: 'Roboto ', returnTag: 'span' },
       ],
     };

     multipleFonts(array);
    </script>
  </body>
</html>
```
HTML result of the `<div id='div-title'>`;

```HTML
<!-- Before -->
<div id="div-title">
  With text of a DOM element. Text for test multiple-fonts. Text for test.
</div>

<!-- After -->
<div id="div-title">
  With  
  <span style="font-family: Barriecito;">Text</span>  
  of a DOM element.  
  <span style="font-family: Rubik Mono One;">Text</span>  
  for test multiple-fonts.  
  <span style="font-family: Roboto;">Text</span>  
  for test.
</div>
```
Visual result:
![Screenshot-2019-9-8 multiple-fonts Demo(2)](https://user-images.githubusercontent.com/13499566/64492401-a3ce9a00-d230-11e9-9e13-427a8c955698.png)

### Specify an existing DOM element

Type of text search: **splitByChar** 

**Use case:** Pass an existing HTML element as a parameter to extract its text and make the assign of its correspondent font, in this case, the element  `<div id='div-title'>` es al cual se le extrae el texto, se separa por medio del carácter espacio(' '), is to which the text is extracted, the text is divided by space(' ') character, later making the assignation of the fonts, finishing with the update of the element `<div id='div-title'>`. Only a font will be assigned in the position [0] of the text divided.

**Example;**
```HTML
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>multiple-fonts Demo</title>
    <link href="https://fonts.googleapis.com/css?family=Barriecito|Roboto:100|Rubik+Mono+One&display=swap" rel="stylesheet">  
    <style>body{font-family: 'arial'; background: white; color: black; font-size: 20px;}</style>
  </head>
  <body>
    <br><br><br>
    <div id="div-title">
      With text and tag name. Text for test multiple-fonts. Text for test. 
    </div>
    <script src="multiple-fonts.min.js" type="text/javascript"></script>
    <script type="text/javascript">
     const array = {
       mainElement: document.getElementById('div-title'),
       splitByChar: ' ',
       multiple: [
         { pos: 1, font: 'Barriecito', returnTag: 'span' },
       ],
     };

     multipleFonts(array);
    </script>
  </body>
</html>
```
HTML result of the `<div id='div-title'>`;

```HTML
<!-- Before -->
<div id="div-title">
  With text of a DOM element. Text for test multiple-fonts. Text for test.
</div>

<!-- After -->
<div id="div-title">
  With 
  <span style="font-family: Barriecito;">text</span> 
  and tag name. Text for test multiple-fonts. Text for test. 
</div>
```

Visual result:
![Screenshot-2019-9-8 multiple-fonts Demo(3)](https://user-images.githubusercontent.com/13499566/64492367-6833d000-d230-11e9-9bff-34574ee04843.png)

***
Twitter: [@_codemart](https://twitter.com/_codemart)

Contact: mauriciomartinezsocial@gmail.com




