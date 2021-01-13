import axios from 'axios';
import { expect } from 'chai';

const monitorId = process.env.PM_MONITOR_ID;
const apiKey = process.env.PM_API_KEY;
if (!monitorId) {
    throw new Error('No Monitor ID provided');
}
if (!apiKey) {
    throw new Error('No API Key provided');
}

const monitorUrl = `https://api.getpostman.com/monitors/${monitorId}/run`;
const headers = { 'X-API-Key': apiKey };

describe('Run Monitor Collection', function () {
    let response, runData;

    before(async function () {
        console.log('STARTING MONITOR');
        response = await axios.post(monitorUrl, {}, { headers });
    });

    it('should run the monitor successfully', function () {
        expect(response.status).to.equal(200);
        expect(response.statusText).to.equal('OK');

        runData = response.data.run;
        for (const request of runData.executions) {
            console.log(request.item.name);
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
