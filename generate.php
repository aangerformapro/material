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
    if(size){
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
    '',
    '// generate default export',
    'const svgs = {',
];

$names          = [];

foreach (array_keys($result) as $id):
    $varName    = str_replace('-', '_', $id);
    $names[$id] = $varName;
    $def[]      = "    {$varName},";
    ?>
export const <?= $varName; ?> = new Xlink('<?= $id; ?>');
<?php
endforeach;

echo "\n// creates naming map\n";
echo 'const names = [';

foreach ($names as $id => $name)
{
    printf("    ['%s', '%s'],\n", $id, $name);
}
echo "];\n";

// add default
echo implode("\n", $def) . "\n};\n";

echo "export default svgs;\n";
?>

//watch dom for icons to add
const
    selector = 'i[class^="ng-"]',
    nodes = new Set(),
    watcher = (elem) =>
    {

        return () =>
        {

            for (let target of [...elem.querySelectorAll(selector)])
            {

                if (nodes.has(target))
                {
                    continue;
                }
                nodes.add(target);

                // creates the icon and remove the node
                const
                    id = target.className.split(' ')[0],
                    [, name] = names.find(item => item[0] === id) ?? ['', ''];


                if (name && svgs[name])
                {
                    let size = target.getAttribute("size"), color = target.getAttribute("color");

                    svgs[name].insertBefore(target, size, color);
                }

                target.parentElement?.removeChild(target);
            }
        };
    };




export function watch(elem)
{
    elem ??= document.body;
    const
        fn = watcher(elem),
        observer = new MutationObserver(fn);

    fn();
    observer.observe(elem, {
        attributes: true, childList: true, subtree: true
    });

    return () =>
    {
        observer.disconnect();
    };
}

<?php

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
    <link rel="shortcut icon" href="https://www.gstatic.com/images/icons/material/apps/fonts/1x/catalog/v5/favicon.svg" type="image/svg">
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

            background: #ddd;
            color: #333;
            padding-top: 250px;
        }
        header {
            position:fixed;
            top:0;
            left:0;
            width: 100%;
            background: #dddd;
            backdrop-filter: blur(3px);
            height: 250px;
        }
        footer{
            font-weight: 600;
            font-size: 14px;
            text-align: center;
            margin: 16px auto;
            padding: 16px 0;
        }
        h1{
            margin: 4vmin;
            text-align: center;
            font-size: 32px;
        }
        h1:after{
            content:'';
            height: 3px;
            width: 90%;
            background: #333;
            display: block;
            margin: 3vmin auto;
        }
        .demo {
            display: flex;
            flex-wrap: wrap;
            margin: 16px auto;
        }
        .icon-card {
            width: calc(50% - 18px);
            margin: 16px 8px;
            display: flex;
            justify-content: center;
            font-weight: 600;
            height: 160px;
            order:-1; 
            transition-duration: .5s;
        }
        .icon-card-inner{
            margin: auto;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border: 1px solid transparent;
            border-radius: 8px;
            padding: 8px 16px;
        }
        .icon-card svg{
            width: 64px;
            height: 64px;
        }
        .icon-name, .icon-name-short{
            margin: 8px auto;
            word-wrap: break-word;
            text-align: center;
        }
        .icon-card-inner:hover {
            font-weight: 700;
            background: #fff;
            border-color: rgba(0,0,0, .3);
        }
        .icon-card-inner:not(:hover) .icon-name,
        .icon-card-inner:hover .icon-name-short {
            display: none;
        }
        .quicksearch{
            display: flex;
            justify-content: center;
        }
        .quicksearch [type="text"] {
            outline:0;
            width: 80%;
            height: 48px;
            font-size: 20px;
            padding: 8px 16px;
            margin: 0 auto 16px auto;
            background: #dddc;
            color: #333c;
            border: 2px solid #3333;
            border-radius: 16px;
            transition-duration: .25s;
            
        }
        .quicksearch [type="text"]:focus{
            background: #fff;
            color: #000;
            border-color: #333c;
        }
        .info{
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .info svg{
            margin: 6px 0 0 6px;
        }
        a{
            font-size: 20px;
            font-weight: 500;
            color: #333;
            text-decoration: none;
        }
        a:hover{
            font-weight: 600;
            color: #222;
            text-decoration: underline;
        }
        a:active{
            color: #111;
        }
        .zoomOut{
            opacity:0;
            transform: scale(0);
            transition-duration: .5s;
            order:1;
        }

        @media (min-width: 768px) {
            .icon-card {
                width: calc(33% - 18px);
            }
        }
        @media (min-width: 992px) {
            .icon-card {
                width: calc(25% - 18px);
            }
        }
    </style>
</head>
<body>
    <header>
        <h1>SVG Sprite Demo</h1>
        <div class="quicksearch">
            <input type="text" name="search" id="search" value="" placeholder="Search for icon ..." tabindex="0">
        </div>
        <div class="info">
            <a class="info" href="https://fonts.google.com/icons?icon.set=Material+Symbols" target="_blank" title="Google Fonts">
                <span>Find more symbols</span><i class="ng-open-in-new" size="20"></i>
            </a>
        </div>
    </header>

    <div class="demo">
       
        <?php  foreach ($names as $id => $name): ?>
            <div class="icon-card" data-keywords="<?= str_replace('_', ' ', mb_substr($name, 3)); ?>">
                <div class="icon-card-inner">
                    <i class="<?= $id; ?>" size="64"></i>
                    <span class="icon-name">&lt;i class="<?= $id; ?>"&gt;&lt;/i&gt;</span>
                    <span class="icon-name-short">i.<?= $id; ?></span>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
    <footer>
        &copy; <span class="year">2023</span>  Aymeric Anger
    </footer>

    <script type="module">
        import { watch } from './sprite.js';
        const year = (new Date()).getFullYear(), search = document.querySelector('#search');
        document.querySelectorAll('.year').forEach(el=>el.innerHTML= year);
        // disconnects the observer when all symbols are loaded
        watch()();

        let targets;
        function findIcon(e){
            targets ??= [...document.querySelectorAll('.icon-card')];
            let input = search.value, words = input.split(/\s+/);
            targets.forEach(t => {
                if(input.length === 0 || words.some(w =>  t.matches(`.demo [data-keywords*="${w}"]`))){
                    t.classList.remove('zoomOut');
                } else {
                    t.classList.add('zoomOut');
                }
                scrollTo(0,0);
            });
        }

        // @link https://stackoverflow.com/questions/985272/selecting-text-in-an-element-akin-to-highlighting-with-your-mouse
        function selectText(node) {
            if (document.body.createTextRange) {
                const range = document.body.createTextRange();
                range.moveToElementText(node);
                range.select();
            } else if (window.getSelection) {
                const selection = window.getSelection(), range = document.createRange();
                range.selectNodeContents(node);
                selection.removeAllRanges();
                selection.addRange(range);
            } else {
                console.warn("Could not select text in node: Unsupported browser.");
            }
        }

        search.value = '';
        search.addEventListener('keyup', findIcon);
        search.addEventListener('change', findIcon);
        search.focus();

        addEventListener('click', e=>{
            let target;
            if(target = e.target.closest('.icon-card')){
                selectText(target.querySelector('.icon-name'));
            }
        });
    </script>
</body>
</html><?php

$contents       = ob_get_clean();
echo "Creating: {$outdir}/sprite.html\n";

file_put_contents($dist . 'sprite.html', $contents);
