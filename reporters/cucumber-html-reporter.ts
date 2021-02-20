import * as reporter from 'cucumber-html-reporter';
import { Options } from "cucumber-html-reporter";
import { join } from 'path';
import ConfigUtils from "../support/ConfigUtils";

const options: Options = {
    theme: 'bootstrap',
    name: "Eafad Api Report",
    brandTitle: "Afad",
    jsonFile: join(ConfigUtils.getInstance().BaseDir, 'report/cucumber-report.json'),
    output: join(ConfigUtils.getInstance().BaseDir, 'report/cucumber-report.html'),
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: true,
    metadata: {
        'App Version': '1.0.0',
        'Test Environment': 'DEV'
    }
};

reporter.generate(options);