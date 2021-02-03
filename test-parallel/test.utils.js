import { expect } from 'chai';
import newman from 'newman';

const apiKey = process.env.PM_API_KEY;
if (!apiKey) {
    throw new Error('No API Key provided');
}

const collectionApi = 'https://api.getpostman.com/collections';
const resultsDir = `${process.cwd()}/test-results/newman`;

export const executeNewman = async (collectionId) => {
    const collectionUrl = `${collectionApi}/${collectionId}?apikey=${apiKey}`;
    const htmlReport = `${resultsDir}/newman-results-${collectionId}.html`;

    return new Promise(resolve => {
        newman.run({
            collection: collectionUrl,
            reporters: ['htmlextra'],
            reporter: {
                htmlextra: { export: htmlReport }
            }
        }).on('start', (error) => {
            expect(error, 'Error should be null').to.be.null;
        }).on('done', (error, summary) => {
            expect(error, 'Error should be null').to.be.null;
            resolve(summary.run);
        });
    });
};

export const expectFailedBelowTolerance = (data, tolerance) => {
    tolerance = Number.parseInt(tolerance);
    expect(data.failed, `Failed assertions should be below: ${tolerance}`).to.be.below(tolerance);
};
