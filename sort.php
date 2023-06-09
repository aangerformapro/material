<?php

declare(strict_types=1);

$dir  = __DIR__ . '/svgs/';

$data = ['items' => []];

foreach (scandir($dir) as $file)
{
    if ( ! str_ends_with($file, '.svg'))
    {
        continue;
    }
    $new             = preg_replace('#^[^n][^g][^-]#', 'ng_$0', $file);

    $new             = str_replace('_', '-', $new);

    $id              = mb_substr($new, 0, -4);

    $data['items'][] = [
        'id'   => $id,
        'code' => sprintf('<svg fill="currentColor" class="ng-svg-icon"><use xlink:href="#%s"></use></svg>', $id),

    ];

    if ($new === $file)
    {
        continue;
    }

    rename($dir . $file, $dir . $new);
}

file_put_contents($dir . '/sprite.json', json_encode(
    $data,
    JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
));
