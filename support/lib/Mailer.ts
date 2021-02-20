import nodeMailer, { SendMailOptions, Transporter } from 'nodemailer';

import ConfigUtils from '@support/ConfigUtils';
import { Environment, Scn } from '@support/Types';

class Mailer {
    private Process: any = process;

    private mailOptions: SendMailOptions = {
        priority: 'normal'
    };

    /**
     *
     * @param mailOptions
     */
    public async sendMail(mailOptions: SendMailOptions): Promise<boolean> {
        console.log('Sending email begins');

        // create reusable transporter object using the default SMTP transport
        const transporter: Transporter = nodeMailer.createTransport(ConfigUtils.getInstance().MailOptions());

        let result: Promise<boolean> = Promise.resolve(true);

        // send mail with defined transport object
        await transporter.sendMail(mailOptions).then(function (info): Promise<boolean> {
            console.log('Message %s sent: %s', info.messageId, info.response);

            result = Promise.resolve(true);

            return result;
        }).catch(function (error): Promise<boolean> {
            console.log('An error when sending mail' + error);

            result = Promise.resolve(false);

            return result;
        });

        return result;
    }

    /**
     *
     * @param config
     * @param ENV
     */
    public async sendingSummaryReport(ENV: Environment): Promise<boolean> {
        if (this.Process.env.API_SendMail !== 'true')
            return Promise.resolve(true);

        const reportName = this.Process.env.API_ReportName || 'cucumber_report';
        const buildUrl = this.Process.env.API_BuildUrl || 'local';

        this.mailOptions = {
            from: '"🚀 API 👻" <YOUR_MAIL>@gmail.com>', // sender address
            // to: 'enes.pekkaya@afad.gov.tr', // '', // list of receivers
            to: '<LIST_OF_MAILS>', // '', // list of receivers
            subject: `🚀 API Testing Report ${reportName} 👻 - PASSED: ${ENV.TestStatus.PASSED} / FAILED: ${ENV.TestStatus.FAILED} / SKIPPED: ${ENV.TestStatus.SKIPPED} / BLOCKED: ${ENV.TestStatus.PENDING}` // Subject line
        };

        //this.addReportAttachment(reportName);

        this.mailOptions.html = `Cucumber Reporter Html : ${buildUrl}API-Report/index.html`;

        if (ENV.TestStatus.FAILED_SCN.length > 0 && ENV.TestStatus.FAILED > 0)
            this.mailOptions.html += this.createSummaryTable(ENV.TestStatus.FAILED_SCN, "Failed Scenerios");

        if (ENV.TestStatus.SKIPPED_SCN.length > 0 && ENV.TestStatus.SKIPPED > 0)
            this.mailOptions.html += this.createSummaryTable(ENV.TestStatus.SKIPPED_SCN, "Skipped Scenerios");

        if (ENV.TestStatus.PASSED_SCN.length > 0 && ENV.TestStatus.PASSED > 0)
            this.mailOptions.html += this.createSummaryTable(ENV.TestStatus.PASSED_SCN, "Success Scenerios");

        return await this.sendMail(this.mailOptions);
    }

    /**
     *
     * @param arrayList
     * @param tableName
     */
    private createSummaryTable(arrayList: Scn[], tableName: string): string {
        let table = '<br /><br /><table border=\'1\' width=\'700\' cellpadding=\'2\' cellspacing=\'2\'>';
        table += '<tr><th colspan="3">'+ tableName +'</th></tr>';
        table += '<tr><th>Environment</th><th>Feature</th><th>Scenerio</th></tr>';

        arrayList.forEach((obj: Scn): void => {
            table += `<tr><td>${obj.Environment}</td><td>${obj.Feature}</td><td>${obj.Scenario}</td></tr>`;
        });

        table += '</table> ';

        return table;
    }
}

export default new Mailer();
