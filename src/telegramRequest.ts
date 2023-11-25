import https from 'node:https';
import { TelegramErrorResponse } from './types';
import { TelegramError } from './telegramError';

export class TelegramRequest {
    static telegramApi: string = 'https://api.telegram.org';
    static telegramToken: string = '';

    static setTelegramApi(telegramApi: string) {
        TelegramRequest.telegramApi = telegramApi;
    }

    static setTelegramToken(telegramToken: string) {
        TelegramRequest.telegramToken = telegramToken;
    }

    static createURL(path: string): URL {
        return new URL(`${TelegramRequest.telegramApi}/bot${TelegramRequest.telegramToken}/${path}`);
    }

    static sendRequest<T>(path: string, body: Object): Promise<T> {
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

                response.on('data', (chunk) => {
                    data += chunk
                });
                response.on('end', () => {
                    try {
                        const updates: T = JSON.parse(data).result;
                        if (response.statusCode != 200) {
                            throw new TelegramError((updates || JSON.parse(data)) as TelegramErrorResponse, "NetworkError");
                        }
                        if(!updates){
                            throw new TelegramError(new Error("Parse response return null"), "ParsingError");
                        }
                        resolve(updates);
                    } catch (error) {
                        reject(error);
                    }
                });
            }).on('error', (error: Error) => {
                reject(new TelegramError(error));
            });

            req.write(bodyString);
            req.end();
        });
    }
}