const logger = require('../helper-functions/logger');
const { writeSummary } = require('../helper-functions/log-summarizer');
const { listModels, createModel, getModel, updateModel, deleteModel, addContributor, deleteContributor } = require('../request-functions/model');
const { setPublicModelID, setPrivateModelID, getUserToken, getPublicModelID, getPrivateModelID, getAdminToken, getUserID } = require('../helper-functions/temp-storage');
const infoConfig = require('../info');

beforeAll(() => {
    logger.startEnd('Start testing backend-core/v2/model methods');
});

afterAll(() => {
    logger.startEnd('Finish testing backend-core/v2/model methods');
    writeSummary(logger)
});

test('Test list models API', async () => {
    let response = null;
    try {
        response = await listModels();
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
        logger.error(`Failure. Test list models API failed. Status: ${response === null ? 'could not send request' : response.status}`);
    }
});

test('Test create model API with and without token', async () => {
    let response = null;
    try {
        response = await createModel("");
        expect(response.status).toEqual(401);
        expect(response.data.message).toStrictEqual("Please authenticate");

        response = await createModel(await getUserToken());
        expect(response.status).toEqual(201);
        expect(response.data).toBeDefined();

        await setPrivateModelID(response.data);
        logger.info('Success. Tested create model API with and without token.')
    } catch (error) {
        logger.error(`Failure. Test create model API with and without token failed. Status: ${response === null ? 'could not send request' : response.status}`);
    }
});

test('Test get model API without any token', async () => {
    let response = null;
    try {
        response = await getModel(await getPublicModelID(), "");
        expect(response.status).toEqual(200);
        expect(response.data).toBeDefined();

        response = await getModel(await getPrivateModelID(), "");
        expect(response.status).toEqual(403);
        expect(response.data.message).toStrictEqual("Forbidden");

        logger.info('Success. Tested get model API without any token.')
    } catch (error) {
        logger.error(`Failure. Test get model API without any token failed. Status: ${response === null ? 'could not send request' : response.status}`);
    }
});

test('Test get model API with user token', async () => {
    let response = null;
    try {
        response = await getModel(await getPrivateModelID(), await getUserToken());
        expect(response.status).toEqual(200);
        expect(response.data).toBeDefined();

        logger.info('Success. Tested get model API with user token.')
    } catch (error) {
        logger.error(`Failure. Test get model API with user token failed. Status: ${response === null ? 'could not send request' : response.status}`);
    }
});

test('Test update public model API with user token', async () => {
    let response = null;
    try {
        response = await updateModel(await getPublicModelID(), await getUserToken(), infoConfig["test_model_name"]);
        expect(response.status).toEqual(403);
        expect(response.data.message).toStrictEqual("Forbidden");

        logger.info('Success. Tested update public model API with user token.')
    } catch (error) {
        logger.error(`Failure. Test update public model API with user token failed. Status: ${response === null ? 'could not send request' : response.status}`);
    }
});

test('Test update private model API with user token', async () => {
    let response = null;
    try {
        response = await updateModel(await getPrivateModelID(), await getUserToken(), infoConfig["test_model_name"]);
        expect(response.status).toEqual(200);
        expect(response.data).toBeDefined();

        logger.info('Success. Tested update private model API with user token.')
    } catch (error) {
        logger.error(`Failure. Test update private model API with user token failed. Status: ${response === null ? 'could not send request' : response.status}`);
    }
});

test('Test update private model API with admin token', async () => {
    let response = null;
    try {
        response = await updateModel(await getPrivateModelID(), await getAdminToken(), infoConfig["test_model_name"]);
        expect(response.status).toEqual(200);
        expect(response.data).toBeDefined();

        logger.info('Success. Tested update private model API with admin token.')
    } catch (error) {
        logger.error(`Failure. Test update private model API with admin token failed. Status: ${response === null ? 'could not send request' : response.status}`);
    }
});

test('Test add contributor API to a private model using user token', async () => {
    let response = null;
    try {
        response = await addContributor(await getPrivateModelID(), await getUserID(), await getUserToken());
        expect(response.status).toEqual(201);
        expect(response.data).toBeNull();
        logger.info('Success. Tested add contributor API to a private model using user token.')
    } catch (error) {
        logger.error(`Failure. Test add contributor API to a private model using user token failed. Status: ${response === null ? 'could not send request' : response.status}`);
    }
});

test('Test add contributor API to a public model using user token', async () => {
    let response = null;
    try {
        response = await addContributor(await getPublicModelID(), await getUserID(), await getUserToken());
        expect(response.status).toEqual(403);
        expect(response.data.message).toStrictEqual("Forbidden");
        logger.info('Success. Tested add contributor API to a public model using user token.')
    } catch (error) {
        logger.error(`Failure. Test add contributor API to a public model using user token failed. Status: ${response === null ? 'could not send request' : response.status}`);
    }
});

test('Test delete contributor API using admin token', async () => {
    let response = null;
    try {
        response = await deleteContributor(await getPrivateModelID(), await getUserID(), await  getAdminToken());
        expect(response.status).toEqual(204);
        expect(response.data).toBeNull();
        logger.info('Success. Tested delete contributor API using admin token.')
    } catch (error) {
        logger.error(`Failure. Test delete contributor API using admin token failed. Status: ${response === null ? 'could not send request' : response.status}`);
    }
});

test('Test delete public model API using user token', async () => {
    let response = null;
    try {
        response = await deleteModel(await getPublicModelID(), await getUserToken());
        expect(response.status).toEqual(403);
        expect(response.data.message).toStrictEqual("Forbidden");
        logger.info('Success. Tested delete public model API using user token.')
    } catch (error) {
        logger.error(`Failure. Test delete public model API using user token failed. Status: ${response === null ? 'could not send request' : response.status}`);
    }
});

test('Test delete private model API using admin token', async () => {
    let response = null;
    try {
        response = await deleteModel(await getPrivateModelID(), await getAdminToken()); 
        expect(response.status).toEqual(204);
        expect(response.data).toBeNull();
        logger.info('Success. Tested delete private model API using admin token.')
    } catch (error) {
        await deleteModel(await getPrivateModelID(), await getUserToken());  // Ensure that the testing model will be deleted
        logger.error(`Failure. Test delete private model API using admin token failed. Status: ${response === null ? 'could not send request' : response.status}`);
    }
});