# API Testing with Cucumber.js V7 And TypeScript
This project includes these features;

1. Running based on cucumber-js
2. Written with Typescipt
3. Integrated Node-Fetch for sending requests
4. Used chai for assertions
3. Used cucumber-html-reports for Reporting. (In the future will be added allure-report which is now not supporting cucumber-js v7.x)
4. Sending report mails via gmail. (Please change settings with your credentials. support->lib->Mailer.ts and support->ConfitUtils.ts )

## To Run Api Testing

First the clone the project

`git clone https://github.com/espekkaya/cucumber-js-api-testing.git`

Install the npm packages

`npm install`

To run project

`npm run api-test`

To generate the cucumber-html-report

`npm run api-report`
