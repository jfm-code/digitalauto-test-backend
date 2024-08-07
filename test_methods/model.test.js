const logger = require('../helper_functions/logger');
const { writeSummary } = require('../helper_functions/logsummary');
const { listModels, createModel, getModel, updateModel } = require('../request_functions/model');
const { setPublicModelID, setPrivateModelID, getUserToken, getPublicModelID, getPrivateModelID, getAdminToken } = require('../helper_functions/temp_storage');
const infoConfig = require('../helper_functions/info_config');

beforeAll(() => {
    logger.startEnd('Start testing backend-core/v2/model methods');
});

afterAll(() => {
    logger.startEnd('Finish testing backend-core/v2/model methods');
    writeSummary(logger)
});

test('Test list models API', async () => {
    try {
        const response = await listModels();
        // logger.debug(`Status: ${response.status}`);
        // logger.debug(`Data: ${JSON.stringify(response.data)}`);

        expect(response.status).toEqual(200);
        expect(response.data.results).toBeDefined();
        
        for (const model of response.data.results) {
            if (model.visibility === "public") {
                await setPublicModelID(model.id);
            }
        }

        logger.info('Success. Tested list models API.')
    } catch (error) {
        logger.error('Failure. Test list models API failed.');
    }
});

test('Test create model API with and without token', async () => {
    try {
        let response = await createModel("");
        expect(response.status).toEqual(401);
        expect(response.data.message).toStrictEqual("Please authenticate");

        response = await createModel(await getUserToken());
        expect(response.status).toEqual(201);
        expect(response.data).toBeDefined();

        await setPrivateModelID(response.data);
        logger.info('Success. Tested create model API with and without token.')
    } catch (error) {
        logger.error('Failure. Test create model API with and without token failed.');
    }
});

test('Test get model API without any token', async () => {
    try {
        let response = await getModel(await getPublicModelID(), "");
        expect(response.status).toEqual(200);
        expect(response.data).toBeDefined();

        response = await getModel(await getPrivateModelID(), "");
        expect(response.status).toEqual(403);
        expect(response.data.message).toStrictEqual("Forbidden");

        logger.info('Success. Tested get model API without any token.')
    } catch (error) {
        logger.error('Failure. Test get model API without any token failed.');
    }
});

test('Test get model API with user token', async () => {
    try {
        const response = await getModel(await getPrivateModelID(), await getUserToken());
        expect(response.status).toEqual(200);
        expect(response.data).toBeDefined();

        logger.info('Success. Tested get model API with user token.')
    } catch (error) {
        logger.error('Failure. Test get model API with user token failed.');
    }
});

test('Test update public model API with user token', async () => {
    try {
        const response = await updateModel(await getPublicModelID(), await getUserToken(), infoConfig["test_model_name"]);
        expect(response.status).toEqual(403);
        expect(response.data.message).toStrictEqual("Forbidden");

        logger.info('Success. Tested update public model API with user token.')
    } catch (error) {
        logger.error('Failure. Test update public model API with user token failed.');
    }
});

test('Test update private model API with user token', async () => {
    try {
        const response = await updateModel(await getPrivateModelID(), await getUserToken(), infoConfig["test_model_name"]);
        expect(response.status).toEqual(200);
        expect(response.data).toBeDefined();

        logger.info('Success. Tested update private model API with user token.')
    } catch (error) {
        logger.error('Failure. Test update private model API with user token failed.');
    }
});

test('Test update private model API with admin token', async () => {
    try {
        const response = await updateModel(await getPrivateModelID(), await getAdminToken(), infoConfig["test_model_name"]);
        expect(response.status).toEqual(200);
        expect(response.data).toBeDefined();

        logger.info('Success. Tested update private model API with admin token.')
    } catch (error) {
        logger.error('Failure. Test update private model API with admin token.');
    }
});