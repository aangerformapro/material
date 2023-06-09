<?php declare(strict_types=1);

$output = __DIR__ . '/dist/';
$c      = file_get_contents('sprite.svg');
$data   = json_decode(file_get_contents('sprite.json'), true);
$code   = [];

ob_start(); ?>

/**
 * Material Design Custom SVG Sprite
 */
const parser = document.createElement('div');
parser.innerHTML = `<?php echo $c; ?>`;

export const sprite = parser.removeChild(parser.firstChild);
document.documentElement.appendChild(sprite);

<?php include 'template.jss';

echo "const icons = {\n";

foreach ($data['keys'] as $key)
{
    $item   = $data['items'][$key];
    $code[] = sprintf('    %s = new SvgIcon(icons[\'%s\'])', $key, $key);

    echo "    {$key}:{\n";

    foreach ($item as $index => $value)
    {
        printf("        %s: `%s`,\n", $index, $value);
    }

    echo "    },\n";
}

echo "};\n";

echo "export const \n" . implode(",\n", $code) . ";\n";

file_put_contents($output . 'sprite.js', ob_get_clean());
copy('sprite.json', $output . 'sprite.json');
copy('sprite.svg', $output . 'sprite.svg');
