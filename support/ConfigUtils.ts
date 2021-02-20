import { join } from 'path';
import * as SMTPTransport from 'nodemailer/lib/smtp-transport';

import { Paths, Environment } from '@support/Types';

class ConfigUtils {
    //region Variables

    private _env!: Environment;
    private static instance: ConfigUtils;
    private _token = "";

    //endregion

    //region Properties

    public get env(): Environment {
        return this._env;
    }

    public set env(value: Environment) {
        this._env = value;
    }

    get token(): string {
        return this._token;
    }

    set token(value: string) {
        this._token = value;
    }


    //endregion


    public static getInstance(): ConfigUtils {
        if (!ConfigUtils.instance)
            ConfigUtils.instance = new ConfigUtils();

        return ConfigUtils.instance;
    }

    //region Timeouts

    public get ScriptTimeOut(): number {
        return 150000;
    }

    //endregion

    //region Paths

    public get BaseDir(): string {
        return join(__dirname, '/../');
    }

    public get Paths(): Paths {
        return {
            allureExecutor: join(__dirname, '/../misc/allure-template/executor.json'),
            allureCategories: join(__dirname, '/../misc/allure-template/categories.json'),
            allureProperties: join(__dirname, '/../misc/allure-template/allure.properties'),
            allureResult: join(__dirname, '/../report/allure-results'),
            environmentJson: join(__dirname, '/../misc/temp/environment.json'),
            featuresSummary: join(__dirname, '/../misc/temp/featuresSummary.json'),
            reportZip: join(__dirname, '/../report/report.zip')
        };
    }

    //endregion

    /**
     * https://accounts.google.com/IssuedAuthSubTokens?hide_authsub=1
     */
    public MailOptions(): SMTPTransport.Options {
        return {
            host: 'smtp.gmail.com', port: 465, secure: true, auth: {
                user: '<YOUR_MAIL>@gmail.com',
                pass: '<YOUR_PASSWORD>',
            }, tls: {
                rejectUnauthorized: false
            }
            // ignoreTLS: true
        };
    }
}

export default ConfigUtils;
