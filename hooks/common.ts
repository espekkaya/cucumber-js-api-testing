import { BeforeAll, After, AfterAll, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { messages } from '@cucumber/messages';
import { ITestCaseHookParameter } from '@cucumber/cucumber/lib/support_code_library_builder/types';

import Mailer from '@support/lib/Mailer';
import ConfigUtils from '@support/ConfigUtils';
import Cli from '@support/lib/Cli';
import { Environment, Scn } from '@support/Types';
import Dates from '@support/lib/Dates';

setDefaultTimeout(ConfigUtils.getInstance().ScriptTimeOut);

BeforeAll(async function () {
    Cli.getCliParams(); //  Get Cli Params

    const template: Environment = {
        ExecutionStartDate: Dates.getCurrentDate(),
        TestStatus: {
            PASSED: 0,
            FAILED: 0,
            SKIPPED: 0,
            PENDING: 0,
            FAILED_SCN: [],
            SKIPPED_SCN: [],
            PASSED_SCN: []
        }
    };

    ConfigUtils.getInstance().env = template;
});


// @ts-ignore
After(function (testCase: ITestCaseHookParameter): void {
    const result = testCase.result as messages.TestStepFinished.ITestStepResult;

    const uri = (testCase.pickle.uri as string).replace(/\\/g, "/").split('/');

    const scn: Scn = {
        Feature: testCase.gherkinDocument.feature?.name as string, //uri.slice(-1)[0].split('.')[0],
        Scenario: testCase.pickle.name as string,
        Environment: `${ uri.slice(-2, -1) } API`
    };

    switch (result.status) {
        case Status.FAILED:
            ConfigUtils.getInstance().env.TestStatus.FAILED += 1;
            ConfigUtils.getInstance().env.TestStatus.FAILED_SCN.push(scn);
            break;

        case Status.SKIPPED:
            ConfigUtils.getInstance().env.TestStatus.SKIPPED += 1;
            ConfigUtils.getInstance().env.TestStatus.SKIPPED_SCN.push(scn);
            break;

        case Status.PENDING:
            ConfigUtils.getInstance().env.TestStatus.PENDING += 1;
            break;

        case Status.PASSED:
            ConfigUtils.getInstance().env.TestStatus.PASSED += 1;
            ConfigUtils.getInstance().env.TestStatus.PASSED_SCN.push(scn);
            break;
    }
});

AfterAll(async function () {
    const promise1 = Mailer.sendingSummaryReport(ConfigUtils.getInstance().env);

    await Promise.all([promise1]);
});
