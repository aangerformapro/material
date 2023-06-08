<?php

declare(strict_types=1);

foreach (scandir(__DIR__) as $file)
{
    $new = preg_replace('#_FILL0.*\.svg$#', '.svg', $file);

    if ($new === $file)
    {
        continue;
    }

    rename(__DIR__ . DIRECTORY_SEPARATOR . $file, __DIR__ . DIRECTORY_SEPARATOR . $new);

    var_dump([$file => $new]);
}

// var_dump(json_encode('|', flags:JSON_H));
