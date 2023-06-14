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

// <svg fill="currentColor" class="ng-svg-icon"><use xlink:href="#ng-volume-mute"></use></svg>

function generateXLink($item, $class = 'ng-svg-icon')
{
    return sprintf('<svg fill="currentColor" class="%s"><use xlink:href="#%s"></use></svg>', $class, $item['id']);
}

$svgs      = getcwd() . '/svgs/';
$dist      = getcwd() . '/dist/';

$files     = scandir($svgs);
$files     = array_filter($files, fn ($f) => str_ends_with($f, '.svg'));

$items     = $result = [];

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

$container = '<svg width="0" height="0" style="display: none;"></svg>';
