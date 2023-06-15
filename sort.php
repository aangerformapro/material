<?php
/**
 * @see https://svgsprit.es/ to generate sprite using folder
 */

declare(strict_types=1);

$dir        = __DIR__ . '/svgs/';

$data       = [
    'items' => [],
    'keys'  => [],
];

$namespaces = [];

foreach (scandir($dir) as $file)
{
    if ( ! str_ends_with($file, '.svg'))
    {
        continue;
    }

    $renamed = preg_replace('#(?:\-FILL.+)\.svg#', '.svg', $file);

    if ($renamed !== $file && @rename($dir . $file, $dir . $renamed))
    {
        $file = $renamed;
    }

    $new     = ! str_starts_with($file, 'ng-') ? 'ng-' . $file : $file;
    $new     = str_replace('_', '-', $new);
    // $id                  = mb_substr($new, 0, -4);
    // $split               = explode('-', $id);
    // array_shift($split);
    // $key                 = implode('_', $split);
    // $namespace           = array_shift($split);
    // $name                = implode('-', $split);

    // if (empty($name))
    // {
    //     $name      = $namespace;
    //     $namespace = null;
    // }

    // $namespaces[$namespace]           = $namespace;

    // $item                = [
    //     'id'        => $id,
    //     'key'       => $key,
    //     'namespace' => $namespace,
    //     'name'      => $name,
    //     'code'      => sprintf('<svg fill="currentColor" class="ng-svg-icon"><use xlink:href="#%s"></use></svg>', $id),

    // ];

    // $data['items'][$key] = $item;

    if ($new === $file)
    {
        continue;
    }

    rename($dir . $file, $dir . $new);
}

// $data['keys'] = array_unique(array_keys($data['items']));
// krsort($data['keys']);

// file_put_contents($dir . '/../sprite.json', json_encode(
//     $data,
//     JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
// ));
