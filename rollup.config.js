import { existsSync } from "node:fs";
import terser from "@rollup/plugin-terser";

const
    input = 'dist/sprite.mjs',
    output = 'dist/sprite.umd.js',
    outputMin = 'dist/sprite.umd.min.js',
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
                    format: 'umd',
                    sourcemap: false,
                    file: outputMin,
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