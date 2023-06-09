<?php declare(strict_types=1);
use Symfony\Component\DomCrawler\Crawler;

require __DIR__ . '/vendor/autoload.php';

$c       = file_get_contents('sprite.svg');
$ids     = [];

$crawler = new Crawler($c);

foreach ($crawler->filter('symbol[id]') as $elem)
{
    $id       = $elem->getAttribute('id');

    $ids[$id] = $id;
}

// var_dump($crawler->filter('symbol[id]')->first()->extract(['id']));
var_dump($ids);

exit;

$e       = base64_encode($c);
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
