const logger = require('../helper-functions/logger');
const { writeSummary } = require('../helper-functions/log-summarizer');
const { createModel, deleteModel } = require('../request-functions/model');
const { createPrototype, deletePrototype } = require('../request-functions/prototype');
const infoConfig = require('../helper-functions/info-config');
const { setPrivateModelID, setPublicModelID, getPrivateModelID, setPrivatePrototypeID, getAdminToken, getPublicModelID, setPublicPrototypeID, getPrivatePrototypeID, getUserToken, getPublicPrototypeID } = require('../helper-functions/temp-storage');

beforeAll(() => {
    logger.startEnd('Start testing backend-core/v2/prototype methods');
});

afterAll(() => {
    logger.startEnd('Finish testing backend-core/v2/prototype methods');
    writeSummary(logger)
});

test('Test create prototype API', async () => {
    let response = null;
    try {
        // Create user's model and admin's model
        response = await createModel(await getUserToken());
        await setPrivateModelID(response.data);
        response = await createModel(await getAdminToken());
        await setPublicModelID(response.data);

        // Create user's prototype and admin's prototype
        response = await createPrototype(
            await getUserToken(),
            await getPrivateModelID(),
            infoConfig["test_prototype_name"]
        );
        expect(response.status).toEqual(201);
        await setPrivatePrototypeID(response.data.id);

        response = await createPrototype(
            await getAdminToken(),
            await getPublicModelID(),
            infoConfig["test_prototype_name"]
        );
        expect(response.status).toEqual(201);
        await setPublicPrototypeID(response.data.id);

        logger.info('Success. Tested create prototype API')
    } catch {
        logger.error(`Failure. Test create prototype API failed. Status: ${response === null ? 'could not send request' : response.status}`);
    }
}, 10000);

test('Test delete prototype API', async () => {
    let response = null;
    try {
        // Delete user's prototype and admin's prototype
        response = await deletePrototype(await getPrivatePrototypeID(), await getUserToken());
        expect(response.status).toEqual(204);
        expect(response.data).toBeNull();

        response = await deletePrototype(await getPublicPrototypeID(), await getAdminToken());
        expect(response.status).toEqual(204);
        expect(response.data).toBeNull();

        // Delete user's model and admin's model
        await deleteModel(await getPrivateModelID(), await getUserToken());
        await deleteModel(await getPublicPrototypeID(), await getAdminToken());

        logger.info('Success. Tested delete prototype API.');
    } catch (error) {
        logger.error(`Failure. Test delete prototype API failed. Status: ${response === null ? 'could not send request' : response.status}`);
    }
}, 10000);