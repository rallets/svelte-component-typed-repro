import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import replace from '@rollup/plugin-replace';
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import css from "rollup-plugin-css-only";
import svelte from "rollup-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";

const production = !process.env.ROLLUP_WATCH;

const getName = str => {
    var split = str.split("/");
    return (split[split.length - 1].split(".")[0]).toLowerCase();
}

export default (param, globals) => {
    var input;
    var jsOutput;
    var cssOutput;
    var appObject;
    if (typeof param === "string") {
        input = param;
        appObject = getName(input);
        jsOutput = "./dist/build/" + appObject + ".js";
        cssOutput = appObject + ".css";
    } else {
        input = param.input;
        var name = getName(input);
        appObject = param.appObject ? param.appObject : name;
        jsOutput = param.jsOutput ? param.jsOutput : "./dist/build/" + name + ".js";
        cssOutput = param.cssOutput ? param.cssOutput : name + ".css";
    }
    globals = globals || {};
    return {
        input: input,
        output: {
            sourcemap: !production,
            format: "iife",
            name: appObject,
            file: jsOutput,
            globals: globals || {}
        },
        plugins: [
            replace({
                preventAssignment: true,
                // "process.env.NODE_ENV": JSON.stringify("development")
                "process.env.NODE_ENV": production ? JSON.stringify("production") : JSON.stringify("development")
            }),

            svelte({
                preprocess: sveltePreprocess({ sourceMap: !production }),
                compilerOptions: {
                    // enable run-time checks when not in production
                    dev: !production,
                }
            }),

            // we"ll extract any component CSS out into
            // a separate file - better for performance
            css({ output: cssOutput }),

            // If you have external dependencies installed from
            // npm, you"ll most likely need these plugins. In
            // some cases you"ll need additional configuration -
            // consult the documentation for details:
            // https://github.com/rollup/plugins/tree/master/packages/commonjs
            resolve({
                browser: true,
                dedupe: ["svelte"]
            }),

            commonjs(),

            typescript({
                tsconfig: "./tsconfig.json",
                sourceMap: !production,
                inlineSources: !production,
                types: ["svelte", "node"],
                resolveJsonModule: true
            }),

            // needed to import the i18n json file `App/i18n/resources-locale_default.json`
            json(),

            // If we"re building for production (npm run build instead of npm run dev), minify
            production && terser()
        ],
        watch: {
            clearScreen: false
        }
    }
};
