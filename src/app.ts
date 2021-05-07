import dotenv from 'dotenv';
dotenv.config()
import dayjs from 'dayjs';
import { getSessions, Logger, sendMail } from './helpers';

const logPath = 'logs.txt';
const logger = new Logger(logPath);

async function main() {
    logger.log('Finding Sessions')
    const dateToday = dayjs();
    const dates = [dateToday, dateToday.add(1, 'day'), dateToday.add(2, 'day')];
    const queryDates = dates.map(d => d.format('DD-MM-YYYY'));

    const pincode = 364001;
    const sessions = [];

    const sessionsToday = await getSessions(pincode, queryDates[0]);
    sessions.push(...sessionsToday);

    const sessionsTomorrow = await getSessions(pincode, queryDates[1]);
    sessions.push(...sessionsTomorrow);

    const adultSessions = sessions.filter(s => s.min_age_limit === 18 && s.available_capacity > 0).map(s => {
        return {
            name: s.name,
            address: s.address,
            fee_type: s.fee_type,
            date: s.date,
            capacity: s.available_capacity,
            age_limit: s.min_age_limit,
            vaccine: s.vaccine
        }
    })
    if (adultSessions.length) {
        logger.log('Vaccine Sessions Found', JSON.stringify(adultSessions, null, 4))
        await sendMail(adultSessions);
    }
}

main();
setInterval(main, 1000 * 60 * 30);
