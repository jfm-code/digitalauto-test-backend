const logger = require('../helper-functions/logger');
const { writeSummary } = require('../helper-functions/log-summarizer');
const { createModel, deleteModel } = require('../request-functions/model');
const { createPrototype, deletePrototype, listPrototype, getPrototype, updatePrototype } = require('../request-functions/prototype');
const infoConfig = require('../info');
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

test('Test list prototype API', async () => {
    let response = null;
    try {
        response = await listPrototype();
        expect(response.status).toEqual(200);
        expect(response.data.totalResults).toBeGreaterThan(0);
        logger.info('Success. Tested list prototype API')
    } catch {
        logger.error(`Failure. Test list prototype API failed. Status: ${response === null ? 'could not send request' : response.status}`);
    }
});

test('Test get prototype API - user get admin prototype', async () => {
    let response = null;
    try {
        response = await getPrototype(await getUserToken(), await getPublicPrototypeID());
        expect(response.status).toEqual(403);
        expect(response.data.message).toStrictEqual("Forbidden");
        logger.info('Success. Tested get prototype API - user get admin prototype.')
    } catch {
        logger.error(`Failure. Test get prototype API - user get admin prototype failed. Status: ${response === null ? 'could not send request' : response.status}`);
    }
});

test('Test get prototype API - admin get user prototype', async () => {
    let response = null;
    try {
        response = await getPrototype(await getAdminToken(), await getPrivatePrototypeID());
        expect(response.status).toEqual(200);
        expect(response.data).toBeDefined();
        logger.info('Success. Tested get prototype API - admin get user prototype.')
    } catch {
        logger.error(`Failure. Test get prototype API - admin get user prototype failed. Status: ${response === null ? 'could not send request' : response.status}`);
    }
});

test('Test get prototype API - wrong prototype ID', async () => {
    let response = null;
    try {
        response = await getPrototype(await getAdminToken(), infoConfig["random_prototype_id"]);
        expect(response.status).toEqual(404);
        expect(response.data.message).toStrictEqual("Prototype not found");
        logger.info('Success. Tested get prototype API - wrong prototype ID.')
    } catch {
        logger.error(`Failure. Test get prototype API - wrong prototype ID failed. Status: ${response === null ? 'could not send request' : response.status}`);
    }
});

test('Test update prototype API', async () => {
    let response = null;
    try {
        response = await updatePrototype(await getUserToken(), await getPrivatePrototypeID(), infoConfig["test_prototype_name"]);
        expect(response.status).toEqual(200);
        expect(response.data).toBeDefined();
        logger.info('Success. Tested update prototype API.')
    } catch {
        logger.error(`Failure. Test update prototype API failed. Status: ${response === null ? 'could not send request' : response.status}`);
    }
});

test('Test update prototype API with empty field', async () => {
    let response = null;
    try {
        response = await updatePrototype(await getAdminToken(), await getPublicPrototypeID(), "");
        expect(response.status).toEqual(400);
        expect(response.data.message).toStrictEqual('"name" is not allowed to be empty');
        logger.info('Success. Tested update prototype API with empty field.')
    } catch {
        logger.error(`Failure. Test update prototype API with empty field failed. Status: ${response === null ? 'could not send request' : response.status}`);
    }
});

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