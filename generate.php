<?php

declare(strict_types=1);

function generateSymbol($item)
{
    $code   = [];

    $code[] = sprintf('<symbol id="%s" xmlns="%s" viewBox="%s">', $item['id'], $item['xmlns'], $item['viewBox']);
    $code[] = sprintf('<path d="%s"></path>', $item['path:d']);
    $code[] = sprintf('</symbol>');

    return implode('', $code);
}

function generateXLink($item, $class = 'ng-svg-icon')
{
    return sprintf('<svg fill="currentColor" class="%s"><use xlink:href="#%s"></use></svg>', $class, $item['id']);
}

$svgs           = getcwd() . '/svgs/';
$dist           = getcwd() . '/dist/';

$files          = scandir($svgs);
$files          = array_filter($files, fn ($f) => str_ends_with($f, '.svg'));

$items          = $result = [];

foreach ($files as $file)
{
    $doc                     = new DOMDocument();
    $doc->load($svgs . $file);

    $svg                     = $doc->firstChild;

    $name                    = mb_substr($file, 0, -4);

    $items[$name]            = [
        'id'      => $name,
        'viewBox' => $svg->getAttribute('viewBox'),
        'xmlns'   => $svg->getAttribute('xmlns'),
        'path:d'  => $svg->firstChild->getAttribute('d'),
    ];
    $result[$name]['symbol'] = generateSymbol($items[$name]);
    $result[$name]['xlink']  = generateXLink($items[$name]);
}

$container      = '<svg width="0" height="0" style="display: none;" id="ng-sprite"></svg>';
ob_start(); ?>

/**
 * Material Design Custom SVG Sprite
 */
const parser = document.createElement('div');
parser.innerHTML = `<?= $container; ?>`;

// generate the shadowroot
const sprite = document.querySelector('#ng-sprite') ?? parser.removeChild(parser.firstChild);

// all the icons that can be injected
const icons = <?= json_encode($result, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE); ?>;
// inject the root element once
let init = sprite.parentElement !== null;

// generate xlink that can be used on the fly
function generateSVG(code, size, color)
{
    parser.innerHTML = code;
    const elem = parser.removeChild(parser.firstChild);
    if(typeof size === 'number'){
        elem.setAttribute('width', '' + size);
        elem.setAttribute('height', '' + size);
    }
    if(color) {
        elem.setAttribute('fill', color);
    }
    return elem;
}


function isElement(elem)
{
    return !!(elem instanceof Object && elem.querySelector);
}

function loadSprite(id)
{
    if (id && icons[id] && icons[id].symbol)
    {

        if (!init)
        {
            // inject shadowroot
            document.documentElement.appendChild(sprite);
        }

        if(!sprite.querySelector('#' + id)){
            // inject symbol
            sprite.innerHTML += icons[id].symbol;
        }

        delete icons[id].symbol;
    }
}



// Easy to inject icon class
class Xlink
{

    get id()
    {
        return this._id;
    }

    get template()
    {
        return icons[this.id].xlink;
    }


    appendTo(parent, size, color)
    {
        if (isElement(parent))
        {
            loadSprite(this.id);
            parent.appendChild(generateSVG(this.template, size, color));
        }
    }
    prependTo(parent, size, color)
    {
        if (isElement(parent))
        {
            loadSprite(this.id);
            parent.insertBefore(generateSVG(this.template, size, color), parent.firstElementChild);
        }
    }
    insertBefore(sibling, size, color)
    {
        if (isElement(sibling))
        {
            loadSprite(this.id);
            sibling.parentElement?.insertBefore(generateSVG(this.template, size, color), sibling);
        }
    }

    constructor(id)
    {
        this._id = id;
    }

}

//render sprite (for ssr)
export function render(){
    return sprite.outerHTML;
}



export function loadAll(){
    for(let id of Object.keys(icons)){
        loadSprite(id);
    }
}


// generate xlinks
<?php

$def            = [
    '// generate default export',
    'export default {',
];

$names          = [];
// $names       = array_keys($result);
// $names       = array_map(
//     fn ($n) => str_replace('-', '_', $n),
//     $names
// );

foreach (array_keys($result) as $id):
    $varName    = str_replace('-', '_', $id);
    $names[$id] = $varName;
    $def[]      = "    {$varName},";
    ?>
export const <?= $varName; ?> = new Xlink('<?= $id; ?>');
<?php
endforeach;

// add default

echo implode("\n", $def) . "\n};\n";

// generate js file
if($contents = ob_get_clean())
{
    $outdir = basename($dist);
    echo "Creating: {$outdir}/sprite.js\n";

    if(@file_put_contents($dist . 'sprite.js', $contents))
    {
        echo "Creating: {$outdir}/sprite.mjs\n";
        @copy($dist . 'sprite.js', $dist . 'sprite.mjs');
    }
    // generate SVG
    echo "Creating: {$outdir}/sprite.svg\n";
    @file_put_contents($dist . 'sprite.svg', str_replace('><', ">\n" . implode(
        "\n",
        array_map(fn ($x) => $x['symbol'], $result)
    ) . "\n<", $container));
}

// generate html demo
ob_start(); ?><!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SVG Sprite Demo</title>
    <style>
        *,
        *::before,
        *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        html {
            font-size: 16px;
            line-height: 1.2;
        }

        body {
            min-height: 100vh;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
                "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
                "Droid Sans", "Helvetical Neue", sans-serif;
        }

        .demo {
            display: flex;
            flex-wrap: wrap;

        }

        .icon-card {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: calc(20% - 16px);
            margin: 8px;
        }
    </style>

    
</head>

<body>
    <h1>SVG Sprite Demo</h1>
    <div class="demo">

    <?php  foreach ($names as $id => $name): ?>
        <div class="icon-card">
        <svg fill="currentColor" class="ng-svg-icon" width="40"><use xlink:href="#<?= $id; ?>"></use></svg>
            <span class="icon-name">
                <?= $name; ?>
            </span>
        </div>

    <?php endforeach; ?>
    </div>
 
    <script type="module">
        import {loadAll} from './sprite.js';
        loadAll();
    </script>

</body>

</html><?php

$contents       = ob_get_clean();
echo "Creating: {$outdir}/sprite.html\n";

file_put_contents($dist . 'sprite.html', $contents);
