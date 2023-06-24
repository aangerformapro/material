import { existsSync } from "node:fs";
import terser from "@rollup/plugin-terser";

const
    input = 'dist/sprite.mjs',
    output = 'dist/sprite.umd.js',
    config = [];

if (existsSync(input))
{
    config.push(
        {
            input,
            output: [
                {
                    format: 'umd',
                    sourcemap: false,
                    file: output,
                    name: 'ngsprite',
                    exports: 'named',
                }
            ],
            context: 'globalThis',
            plugins: [],
        },
        {
            input,
            output: [
                {
                    format: 'cjs',
                    sourcemap: false,
                    file: output.replace(/\.umd\.js$/, '.cjs'),
                    name: 'ngsprite',
                    exports: 'named',
                }
            ],
            context: 'globalThis',
            plugins: [],
        },
        {
            input,
            output: [
                {
                    format: 'umd',
                    sourcemap: false,
                    file: output.replace(/\.js$/, '.min.js'),
                    name: 'ngsprite',
                    exports: 'named',
                }
            ],
            context: 'globalThis',
            plugins: [
                terser(),
            ],
        }
    );
}


export default config;