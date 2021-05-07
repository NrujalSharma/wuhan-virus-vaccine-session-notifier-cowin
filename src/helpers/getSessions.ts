import axios, { AxiosRequestConfig } from 'axios';

export async function getSessions(pincode: number, date: string) {
    try {
        const config: AxiosRequestConfig = {
            method: 'GET',
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${date}`,
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'hi_IN',
                'User-Agent': 'Mozilla/5.0'
            }
        };
        const { data } = await axios(config);
        return data.sessions || [];
    } catch (error) {
        console.error(error);
    }
}
