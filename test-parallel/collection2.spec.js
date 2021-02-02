import { executeNewman, expectFailedBelowTolerance } from './test.utils';
import { config } from './test.config';

const collectionId = process.env.PM_COLLECTION_ID_2;
if (!collectionId) {
    throw new Error('No Collection ID 2 provided');
}

describe('Run Newman Collection 2', function () {
    let runData;

    it('should run collection 2 successfully', async function () {
        runData = await executeNewman(collectionId);
    });

    it(`should fail < ${config.tolerance} requests`, function () {
        expectFailedBelowTolerance(runData.stats.requests, config.tolerance);
    });

    it(`should fail < ${config.tolerance} assertions`, function () {
        expectFailedBelowTolerance(runData.stats.assertions, config.tolerance);
    });
});
