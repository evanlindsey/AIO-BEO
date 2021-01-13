import { expect } from 'chai';
import newman from 'newman';

const collectionId = process.env.PM_COLLECTION_ID;
const apiKey = process.env.PM_API_KEY;
if (!collectionId) {
    throw new Error('No Collection ID provided');
}
if (!apiKey) {
    throw new Error('No API Key provided');
}

const collectionUrl = `https://api.getpostman.com/collections/${collectionId}?apikey=${apiKey}`;
const testReport = `${process.cwd()}/test-results/newman/results.xml`;

describe('Run Newman Collection', function () {
    let runData;

    it('should run the collection successfully', async function () {
        await new Promise(resolve => {
            newman.run({
                collection: collectionUrl,
                reporters: ['cli', 'junit'],
                reporter: { junit: { export: testReport } }
            }).on('start', (err) => {
                expect(err).to.be.null;
                console.log('STARTING COLLECTION');
            }).on('done', (err, summary) => {
                expect(err).to.be.null;
                runData = summary.run;
                resolve();
            });
        });
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
