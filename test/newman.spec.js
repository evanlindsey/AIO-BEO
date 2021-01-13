import axios from 'axios';
import { expect } from 'chai';
import { writeFileSync, existsSync } from 'fs';
import newman from 'newman';

const collectionId = process.env.PM_COLLECTION_ID;
const apiKey = process.env.PM_API_KEY;
if (!collectionId) {
    throw new Error('No Collection ID provided');
}
if (!apiKey) {
    throw new Error('No API Key provided');
}

const collectionUrl = `https://api.getpostman.com/collections/${collectionId}`;
const collectionJson = `${process.cwd()}/collections/${collectionId}.json`;
const headers = { 'X-API-Key': apiKey };

describe('Run Monitor Collection', function () {
    let response, runData;

    before(async function () {
        console.log('RETRIEVING COLLECTION');
        response = await axios.get(collectionUrl, { headers });
    });

    it('should retrieve the collection successfully', function () {
        expect(response.status).to.equal(200);
        expect(response.statusText).to.equal('OK');
    });

    it('should write the collection to file', function () {
        writeFileSync(collectionJson, JSON.stringify(response.data.collection));
        expect(existsSync(collectionJson)).to.be.true;
    });

    it('should run the collection successfully', async function () {
        console.log('RUNNING COLLECTION');
        await new Promise(resolve => {
            newman.run({
                collection: require(collectionJson),
                reporters: 'cli'
            }, (err, summary) => {
                expect(err).to.be.null;
                runData = summary.run;
                resolve();
            });
        });
    });

    it('should fail 0 requests', function () {
        const total = runData.executions.length;
        console.log(`PERFORMED REQUESTS: ${total}`);

        const failed = runData.failures.length;
        console.log(`FAILED REQUESTS: ${failed}`);

        expect(failed).to.equal(0);
    });
});
