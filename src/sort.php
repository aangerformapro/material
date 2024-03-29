<?php
/**
 * @see https://svgsprit.es/ to generate sprite using folder
 */

declare(strict_types=1);

$dir    = getcwd() . '/svgs/';

$result = [];

foreach (scandir($dir) as $file)
{
    if ( ! str_ends_with($file, '.svg'))
    {
        continue;
    }

    $renamed  = preg_replace('#(?:[\-_]FILL.+|[-_](?:black|white)[\-_]\d+dp)\.svg#', '.svg', $file);

    if ($renamed !== $file)
    {
        echo "renaming {$file} ...\n";
    }

    if ($renamed !== $file && @rename($dir . $file, $dir . $renamed))
    {
        $file = $renamed;
    }

    $new      = ! str_starts_with($file, 'ng-') ? 'ng-' . $file : $file;
    $new      = str_replace('_', '-', $new);

    if ($new === $file)
    {
        $result[] = $new;
        continue;
    }

    $result[] = @rename($dir . $file, $dir . $new) ? $new : $file;
}

sort($result);

return $result;
