require('module-alias/register');

// https://www.elliotdenolf.com/posts/cucumberjs-with-typescript/
let common = [
    'features/**/*.feature',                        // Specify our feature files
    '--require-module ts-node/register',            // Load TypeScript module
    '--require env/set-environment-variables.ts',   // Load custom environment variables
    '--require step-definitions/**/*.ts',           // Load step definitions
    '--format progress-bar',                        // Load custom formatter
    '--format @cucumber/pretty-formatter',          // Load custom formatter
    '-f json:report/cucumber-report.json',          // Creating json file
    '--publish-quiet',                              // Disabling publish mode info
    '--require hooks/**/*.ts'
].join(' ');

// TODO: Waiting allure report supports cucumber-js 7 version
// '--format ./reporters/allure-reporter.ts',               // Creating allure report


module.exports = {
    default: common
};