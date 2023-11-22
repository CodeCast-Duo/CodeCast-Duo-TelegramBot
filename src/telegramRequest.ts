import https from 'node:https';
import { Update } from './types/telegramTypes';

export class TelegramRequest {
    static telegramApi: string = 'https://api.telegram.org';
    static telegramToken: string = '';

    static setTelegramApi(telegramApi: string){
        TelegramRequest.telegramApi = telegramApi;
    }

    static setTelegramToken(telegramToken: string){
        TelegramRequest.telegramToken = telegramToken;
    }

    static createURL(path: string): URL {
        return new URL(`${TelegramRequest.telegramApi}/bot${TelegramRequest.telegramToken}/${path}`);
    }

    static sendRequest(path: string, body: Object): Promise<Array<Update>> {
        return new Promise((resolve, reject) => {
            const bodyString = JSON.stringify(body);
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Content-Length': Buffer.byteLength(bodyString)
                }
            };

            const url = this.createURL(path);
            const req = https.request(url, options, (response) => {
                let data = '';

                response.setEncoding('utf8');
                console.log('statusCode:', response.statusCode)
                response.on('data', (chunk) => {
                    data += chunk
                });

                response.on('end', () => {
                    try {
                        const updates: Update[] = JSON.parse(data).result;
                        resolve(updates);
                    } catch (error) {
                        reject(error);
                    }
                });
            }).on('error', (err) => {
                reject(err.message);
            });

            req.write(bodyString);
            req.end();
        });
    }
}