import fetch, { RequestInfo, RequestInit, Response } from 'node-fetch';

class Api {
    private static instance: Api;

    public static getInstance(): Api {
        if (!Api.instance)
            Api.instance = new Api();

        return Api.instance;
    }

    public async get(url: string, headers: any = {}): Promise<Response> {
        return await this.request(url, {
            method: 'GET',
            headers
        });
    }

    public async post(url: string, headers: any = {}, body: any = ''): Promise<Response> {
        return await this.request(url, {
            method: 'POST',
            body,
            headers
        });
    }

    public async put(url: string, headers: any = {}, body: any = ''): Promise<Response> {
        return await this.request(url, {
            method: 'PUT',
            body,
            headers
        });
    }

    public async delete(url: string, headers: any = {}, body: any = ''): Promise<Response> {
        return await this.request(url, {
            method: 'DELETE',
            body,
            headers
        });
    }

    public async request(url: RequestInfo, options: RequestInit): Promise<Response> {
        return await fetch(url, options);
    }
}

export default Api;