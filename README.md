# material
## My Material Kit

### How does it works ?

Check you have php version `>=8.0` in your `$PATH` or `%PATH%`

This project uses php as a svg parser and mjs/html generator and rollup to transform this code into an [UMD](http://jargon.js.org/_glossary/UMD.md) module.


First clone this project
```bash
git clone https://github.com/aangerformapro/material.git
cd material
```

Then install the dependencies

```bash
npm i
```

Then go to [Google Fonts](https://fonts.google.com/icons?icon.set=Material+Symbols) and download the SVGS you want to use in your projects.

Put them in the `svgs` directory. Then when all that is done

```bash
npm run build
```

You will then have:
- an HTML Demo displaying your icons with their tags
- A umd module that exposes `ngsprite` Object
- A minified umd module
- An es module that can be used in your development

### How to use in my code ?

If you put the `<i>` tags in your HTML, to display them you can run the `watch()` function, that uses the mutation observer to trigger dom scans so your tags can be put programmatically and replaced with the sprites instantly.

```js

// if using as an es module use this syntax
import { watch } from 'path/to/sprite.mjs';
// if using the umd module in the browser
const { watch } = ngsprite;

// then you can run you can use another root element if you need
/* const unwatch = */ watch(/* document.body */);

/* you can unregister the dom listener using
unwatch(); */

```
The module also exposes all your icons individually, eg for a file named `ng-app-shortcut.svg` you can access it by it's name with the `-` replaced by `_`

```js
// es6+
import svgs from 'path/to/sprite.mjs';
const {ng_app_shortcut} = svgs;
//or
import {ng_app_shortcut} from 'path/to/sprite.mjs';

// umd
const {ng_app_shortcut} = ngsprite;
// or 
const {ng_app_shortcut} = ngsprite.svgs;

// you can append the icon to an element
// it takes element, size and color arguments
ng_app_shortcut.appendTo(elem /*, 32, '#333' */);

// you can prepend to an element
ng_app_shortcut.prependTo(elem /*, 32, '#333' */);

//you can insert before a specific element
ng_app_shortcut.insertBefore(elem /*, 32, '#333' */);

```
### I don't use all the icons, what happens then ?

If no icons are loaded, it happens nothing.
The sprite will be generated when the first icon is loaded (added to the dom using its methods or using the `<i>` tag and `watch()`) and it will only expose the icons that are loaded. 

you can also, when all the icons you need are loaded extract a custom sprite that can be used manually creating the icons using x:links

```js
//es6+
import { render } from 'path/to/sprite.mjs';
//umd
const { render } = ngsprite;
console.log(render());

```
