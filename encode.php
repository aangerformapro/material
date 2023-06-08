<?php declare(strict_types=1);

require __DIR__ . '/vendor/autoload.php';

$c   = file_get_contents('sprite.svg');

// $e = base64_encode($c);

$dom = new DOMDocument();

$dom->loadXML($c);

var_dump($dom);

exit;
ob_start(); ?>

/**
 * Material Design Custom SVG Sprite
 */
const parser = document.createElement('div');
parser.innerHTML = atob(`<?php echo $e; ?>`);


export const svg = parser.removeChild(parser.firstChild);
svg.style.display = 'none';
document.documentElement.appendChild(svg);




<?php
file_put_contents('sprite.js', ob_get_clean());
