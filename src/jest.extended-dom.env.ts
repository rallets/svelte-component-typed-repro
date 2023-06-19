import JSDOMEnvironment from 'jest-environment-jsdom';

/*
 * Based on: https://github.com/jsdom/jsdom/issues/3363#issuecomment-1467894943
 *
 * NB. when JEST can support `structuredClone` out-of-the-box, we can restore the original environment in `jest.config.json`
 * "testEnvironment": "jsdom", <- original
 * "testEnvironment": "./jest.extended-dom.env.ts", <- extended
 */

// https://github.com/facebook/jest/blob/v29.4.3/website/versioned_docs/version-29.4/Configuration.md#testenvironment-string
export default class FixJSDOMEnvironment extends JSDOMEnvironment {
    constructor(...args: ConstructorParameters<typeof JSDOMEnvironment>) {
        super(...args);

        // FIXME https://github.com/jsdom/jsdom/issues/3363
        this.global.structuredClone = structuredClone;
    }
}
