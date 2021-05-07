import axios, { AxiosRequestConfig } from 'axios';

export async function sendMail(sessionData: any[]) {
    try {
        const config: AxiosRequestConfig = {
            method: 'POST',
            url: process.env.MAILER_URL,
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'hi_IN',
                'Origin': process.env.MAILER_ALLOWED_ORIGIN,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                data: sessionData
            })
        };
        await axios(config);
    } catch (error) {
        console.error(error);
    }
}
