import { executeNewman, expectFailedBelowTolerance } from './test.utils';
import { config } from './test.config';

const collectionId = process.env.PM_COLLECTION_ID_3;
if (!collectionId) {
    throw new Error('No Collection ID 3 provided');
}

describe('Run Newman Collection 3', function () {
    let runData;

    it('should run collection 3 successfully', async function () {
        runData = await executeNewman(collectionId);
    });

    it(`should fail < ${config.tolerance} requests`, function () {
        expectFailedBelowTolerance(runData.stats.requests, config.tolerance);
    });

    it(`should fail < ${config.tolerance} assertions`, function () {
        expectFailedBelowTolerance(runData.stats.assertions, config.tolerance);
    });
});
