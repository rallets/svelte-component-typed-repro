// require('ts-node').register({
//     compilerOptions: {
//       module: 'commonjs'
//     },
//     exclude: ["node_modules","typings"]
//   });

module.exports = function(config) {
    config.set({
        frameworks: ["jasmine", "karma-typescript"],
        files: [
            "Tests/**/*.spec.ts",
            "Scripts/Common/helpers.ts"
        ],
        exclude: ["node_modules"],
        preprocessors: {
            "Tests/**/*.spec.ts": "karma-typescript",
            "Scripts/Common/helpers.ts": "karma-typescript"
        },
        reporters: ["progress", "karma-typescript", "mocha"],
        colors: true,
        logLevel: config.LOG_INFO,
        browsers: ["ChromeHeadless"],
        autoWatch: false,
        concurrency: Infinity
    });
};