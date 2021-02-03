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
const htmlReport = `${process.cwd()}/test-results/newman/newman-results.html`;

describe('Run Newman Collection', function () {
    let runData;

    it('should run the collection successfully', async function () {
        runData = await new Promise(resolve => {
            newman.run({
                collection: collectionUrl,
                reporters: ['cli', 'htmlextra'],
                reporter: {
                    htmlextra: { export: htmlReport }
                }
            }).on('start', (error) => {
                expect(error, 'Error should be null').to.be.null;
                console.log('STARTING COLLECTION');
            }).on('done', (error, summary) => {
                expect(error, 'Error should be null').to.be.null;
                resolve(summary.run);
            });
        });
    });

    it('should fail 0 requests', function () {
        const total = runData.stats.requests.total;
        console.log(`PERFORMED REQUESTS: ${total}`);

        const failed = runData.stats.requests.failed;
        console.log(`FAILED REQUESTS: ${failed}`);

        expect(failed, 'Failed requests should be: 0').to.equal(0);
    });

    it('should fail 0 assertions', function () {
        const total = runData.stats.assertions.total;
        console.log(`PERFORMED ASSERTIONS: ${total}`);

        const failed = runData.stats.assertions.failed;
        console.log(`FAILED ASSERTIONS: ${failed}`);

        expect(failed, 'Failed assertions should be: 0').to.equal(0);
    });
});
