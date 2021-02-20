import { Given, Then } from "@cucumber/cucumber";
import { Response } from 'node-fetch';
import { expect } from 'chai';

import CommonUtils from "@support/CommonUtils";
import Api from "@support/lib/Api";

let ReqResponse: Response;
let body: any;

Given(/^Sending GET request.$/, async function (): Promise<void> {
    ReqResponse = await Api.getInstance().get(
        `https://jsonplaceholder.typicode.com/todos/1`
    );

    return;
});

Then(/^The http status should be 200.$/, async function (): Promise<Chai.Assertion> {
    return expect(ReqResponse.status === 200, `Not equal 200. Response httpstatus: ${ReqResponse.status}`).to.be.true;
});

Then(/^Response format is Json.$/, async function (): Promise<Chai.Assertion> {
    body = await ReqResponse.json();

    return expect(CommonUtils.isJson(body), `Gelen istek json formatında değildir.`).to.be.true;
});

Then(/^User id should equal "([^"]*)".$/, async function (userId: string): Promise<void> {
    expect(body.userId == userId, `User id is not equal !`).to.be.true;
});