
![multiple-fonts](https://user-images.githubusercontent.com/13499566/64492723-4e948780-d234-11e9-8351-3b071b114f7c.png)



***
[multiple-fonts](https://www.npmjs.com/package/multiple-fonts) te permite agregar varias fuentes a un texto de tu sitio web.

mutiple-fonts consiste en realizar busqueda de ciertas palabras o realizar división de texto
por medio de un carácter. La respuesta de la búsquedad es un array, a cada una de las posiciones del resultado se le puede especificar que tenga una fuente en específico, además a cada posición del array de resultado se le puede espeficificar en que elemento HTML será que contendrá el texto de cada posición.

**Ejemplo textual de caso de uso;**

Tienes un blog el cual el título de cada una de las publicaciones es distinto, con un único estilo
de fuente, pero quieres remarcar un fragmento del texto en específico, debido a que todo es datos dinámicos de una base de datos, no puedes manualmente agregar una etiqueta para remarcar texto.

mulitiple-fonts puede realizar la búsqueda del texto que especifiques en el código JS y remarcarlo por ti de forma dinámica, es posible que el texto aparezca más de una vez en la búsqueda, a cada uno de los resultados puedes asignarle un tipo distinto de fuente.

![Screenshot-2019-9-7 Title(1)](https://user-images.githubusercontent.com/13499566/64482923-8f01f000-d1b7-11e9-953c-b5f6b51ab508.png)



## Formas para implementar multiple-fonts;

Hay dos formas de poder usar multiple-fonts;

 - **Especificar el texto a usar y el nombre del elemento HTML que contendrá el texto ingresado.**
-  **Especificar un elemento del DOM ya existente.**

Variantes:
- **Especificar una expresión regular que será buscada en el texto.**
- **Especificar un carácter para separar el texto.**

## Parámetros

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

Texto que será utilizado para darle formato y agregarle varias fuentes según el resultado de la búsqueda.

- `mainElement`

Elemento HTML que será devuelto con el texto ya modificado y fuentes aplicadas. Parámetro que puede ser un string o un elemento HTML.

En el caso que el parámetro sea un string, quiere decir que se tiene que crear el elemento y que será devuelto para agregarlo donde tu gustes. 

Cuando el parámetro es un elemento DOM se dá por entendido que se tiene que extraer el texto que contiene, y luego hacer la búsqueda para aplicar las fuentes

- `searchByRegex`

Parámetro que tiene que ser una expresión regular. Éste parámetro es el encargado de realizar la búsqueda de patrones en el texto, cuando encuentra una coincidencia en el texto, se guarda la posición de la coincidencia para luego ser aplicada la fuente.

![64483302-8c55c980-d1bc-11e9-8cb1-701c846bb8e9](https://user-images.githubusercontent.com/13499566/64492344-3e7aa900-d230-11e9-8013-6ac21661a51c.png)


- `splitByChar`

Parámetro que es un carácter por el cual será dividido el texto, luego de hacer la división un array es obtenido, para posteriormente agregar un tipo de fuente a ciertas posiciones del texto, un ejemplo podría ser separar el texto por espacio(' '), y que al texto de la posición 3 del array, agregarle un tipo de fuente, y a la posición 5 del array, otro tipo de fuente.

- `multiple`

Array encargado de almacenar las fuentes que serán agregadas. Array que contiene objects dentro del él, cada elemento del array debe de tener tres llaves

```typescript
{ pos: 0, font: 'Rubik Mono One', returnTag: 'span' },
```

`pos`: La posición del texto al cual se le aplicará la fuente
`font`: Nombre de la fuente que será aplicada
`returnTag`: Nombre de elemento HTML que contendra al texto de su posición.

Ejemplo del elemento resultante que contendrá al texto de su posición;

```HTML
<span style="font-family: Rubik Mono One">NEW</span>
```

## Datos a considerar

**Nota:** Para usar multiple-fonts, puedes utilizar el archivo que se encuentra en la carpeta `/build/multiple-fonts.js` y agregarlo en tu archivo HTML. NO es necesario JQuery.

**Consideración en los dos tipos de búsqueda de coincidencia:** 

- Es probable que se encuentren menos coincidencias en comparación con el largo del array `multiple`, pero eso no importa ya que la asignación de fuente se hace por medio del orden en que son encontradas y no hay inconveniente que quede fuente sin ser asignada a un texto.

```typescript
const array = {
  text: 'With text and tag name.',

  searchByRegex: /text/gi,
  multiple: [
    { pos: 0, font: 'Barriecito', returnTag: 'p' }, // --> Asignada
    { pos: 5, font: 'Rubik Mono One', returnTag: 'span' }, // --> Sin asignar
    { pos: 31, font: 'Roboto ', returnTag: 'span' }, // --> Sin asignar
  ],
};
```

- Cuando hay más coincidencias en comparación con el largo del array `multiple`, se asignan las fuentes en el orden de encuentro, por ejemplo si hay 5 coincidencias y solamente dos fuentes, entonces a la primera coincidencia se le asigna la primera fuente especificada, y a las restantes 4 coincidencias, la segunda fuente especificada.

```typescript
const array = {
  text: 'With text and tag name. Text for test multiple-fonts. Text for test.',
  
  searchByRegex: /text/gi,
  multiple: [
    { pos: 0, font: 'Barriecito', returnTag: 'p' }, // --> Asignada a la primera coincidencia
    { pos: 5, font: 'Rubik Mono One', returnTag: 'span' }, // --> Asignada a las restantes coincidencias
  ],
};
```


## Ejemplos

### Especificar el texto a usar y el nombre del elemento HTML que contendrá el texto ingresado

Tipo de búsqueda en el texto: **searchByRegex** 

**A considerar en searchByRegex** : Cuando es por searchByRegex, la llave "pos" del object del array `multiple` no se considera debido a que solamente importa el momento en que se encuentra la coincidencia, el orden.

**Caso de uso:** Pasar texto como parámetro, creando un elemento `<h1>` para ser retornado por multiple-fonts y agregado al elemento `<div id='div-title'>`. Buscar la palabra "text" en todo el texto y que no importa que sea en mayúscula o minúscula. La primera coincidencia tendrá la fuente "Barriecito" y el texto  estará dentro de un elemento `<p>`, así mismo con la coincidencia número 2 y 3 en su respectivo elemento con su fuente asignada.


**Ejemplo;**
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
Resultado en HTML del `<div id='div-title'>`;

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

Resultado visual:
![Screenshot-2019-9-8 multiple-fonts Demo](https://user-images.githubusercontent.com/13499566/64492444-2192a580-d231-11e9-9a32-b88dfb553cb9.png)



### Especificar el texto a usar y el nombre del elemento HTML que contendrá el texto ingresado

Tipo de búsqueda en el texto: **splitByChar** 

**A considerar en splitByChar** : Cuando es por splitByChar, la llave `pos` del object del array `multiple` es tomada en cuenta ya que es la que contiene la posición en la cual la fuente puede ser asignada, recordando que cuando se hace un split, el resultado es un array. Además es probable que la llave `pos` tenga un valor más alto en comparación con el array que contiene el texto dividido, pero no hay ningún inconveniente con que eso pase ya que si `pos` es más largo, entonces se le asignará la fuente a la última posición del array del texto dividido.

```typescript
const array = {
  text: 'With text and tag name text. Tag text.',
  //      [0]  [1] [2] [3] [4]   [5]  [6] [7]
  splitByChar: ' ',
  multiple: [
    { pos: 0, font: 'Barriecito', returnTag: 'p' },// --> Asignada a [0]
    { pos: 5, font: 'Rubik Mono One', returnTag: 'span' },// --> Asignada a [5]
    { pos: 31, font: 'Roboto ', returnTag: 'span' },// --> Asignada a [7]
  ],
};

```

**Caso de uso:** Pasar texto como parámetro, creando un elemento `<h1>` para ser retornado por multiple-fonts y agregado al elemento `<div id='div-title'>`. Separar todo el texto por medio de espacio(' '), dejando como resultado un array con cada palabra del texto en una posición, para luego asignar fuente en cada posición según sea el valor de `pos`. A la posición [0] del texto dividido se le asigna la fuente "Barriecito", a la posición [5] del texto dividido la fuente "Roboto", en éste caso el texto dividido tiene un largo de 12, pero en el array de `multiple` se especifica que la posición [31] tendrá la fuente "Rubik Mono One", pero la posición [31] no existe dentro del array de texto dividido, por lo tanto la fuente se aplica a la última posición del texto dividido.

**Ejemplo;**

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
Resultado en HTML del `<div id='div-title'>`;

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
Resultado visual:
![Screenshot-2019-9-8 multiple-fonts Demo(1)](https://user-images.githubusercontent.com/13499566/64492397-9ca78c00-d230-11e9-9aea-044d3f5b685d.png)


***
### Especificar un elemento del DOM ya existente.

Tipo de búsqueda en el texto: **searchByRegex** 

**Caso de uso:** Pasar como parámetro un elemento HTML existente para extraer su texto y hacer la asignación de fuente correspondiente, en éste caso el elemento `<div id='div-title'>` es al cual se le extrae el texto, luego hacer la búsqueda de la palabra "text" sin importar que sea mayúscula o minúscula, siguiendo con hacer la asignación de fuente para posteriormente hacer la actualización del elemento `<div id='div-title'>`

**Ejemplo;**
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
Resultado en HTML del `<div id='div-title'>`;

```HTML
<!-- Antes -->
<div id="div-title">
  With text of a DOM element. Text for test multiple-fonts. Text for test.
</div>

<!-- Después -->
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
Resultado visual:
![Screenshot-2019-9-8 multiple-fonts Demo(2)](https://user-images.githubusercontent.com/13499566/64492401-a3ce9a00-d230-11e9-9e13-427a8c955698.png)


### Especificar un elemento del DOM ya existente.

Tipo de búsqueda en el texto: **splitByChar** 

**Caso de uso:** Pasar como parámetro un elemento HTML existente para extraer su texto y hacer la asignación de fuente correspondiente, en éste caso el elemento `<div id='div-title'>` es al cual se le extrae el texto, se separa por medio del carácter espacio(' '), siguiendo con hacer la asignación de fuente para posteriormente hacer la actualización del elemento `<div id='div-title'>`. Solo se agregará la fuente a la posición [1] del texto dividido.

**Ejemplo;**
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
Resultado en HTML del `<div id='div-title'>`;

```HTML
<!-- Antes -->
<div id="div-title">
  With text of a DOM element. Text for test multiple-fonts. Text for test.
</div>

<!-- Después -->
<div id="div-title">
  With 
  <span style="font-family: Barriecito;">text</span> 
  and tag name. Text for test multiple-fonts. Text for test. 
</div>
```

Resultado visual:
![Screenshot-2019-9-8 multiple-fonts Demo(3)](https://user-images.githubusercontent.com/13499566/64492367-6833d000-d230-11e9-9bff-34574ee04843.png)

***
Twitter: [@_codemart](https://twitter.com/_codemart)

Contacto: mauriciomartinezsocial@gmail.com
