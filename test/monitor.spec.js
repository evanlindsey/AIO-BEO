import { expect } from 'chai';
import axios from 'axios';

const monitorId = process.env.PM_MONITOR_ID;
const apiKey = process.env.PM_API_KEY;
if (!monitorId) {
    throw new Error('No Monitor ID provided');
}
if (!apiKey) {
    throw new Error('No API Key provided');
}

const monitorUrl = `https://api.getpostman.com/monitors/${monitorId}/run?apikey=${apiKey}`;

describe('Run Monitor Collection', function () {
    let runData;

    it('should run the monitor successfully', async function () {
        console.log('STARTING MONITOR');
        const response = await axios.post(monitorUrl, {});

        expect(response.status).to.equal(200);
        expect(response.statusText).to.equal('OK');

        runData = response.data.run;
        for (const entry of runData.executions) {
            const req = entry.request;
            const res = entry.response;
            console.log(`\n${entry.item.name}`);
            console.log(`${req.method} ${req.url} [${res.code}, ${res.responseSize}B, ${res.responseTime}ms]`);
        }
    });

    it('should fail 0 requests', function () {
        const total = runData.stats.requests.total;
        console.log(`PERFORMED REQUESTS: ${total}`);

        const failed = runData.stats.requests.failed;
        console.log(`FAILED REQUESTS: ${failed}`);

        expect(failed).to.equal(0);
    });

    it('should fail 0 assertions', function () {
        const total = runData.stats.assertions.total;
        console.log(`PERFORMED ASSERTIONS: ${total}`);

        const failed = runData.stats.assertions.failed;
        console.log(`FAILED ASSERTIONS: ${failed}`);

        expect(failed).to.equal(0);
    });
});
