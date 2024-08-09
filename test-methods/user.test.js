const logger = require('../helper-functions/logger');
const { writeSummary } = require('../helper-functions/log-summarizer');
const { listUsers, getUser, deleteUser, updateUser, selfPromote, getSelf, updateSelf, createUser } = require('../request-functions/user');
const { getAdminToken, setUserID, getUserID, getUserToken } = require('../helper-functions/temp-storage');
const infoConfig = require('../info');

beforeAll(() => {
  logger.startEnd('Start testing backend-core/v2/user methods');
});

afterAll(() => {
  logger.startEnd('Finish testing backend-core/v2/user methods');
  writeSummary(logger)
});

test('Test list users API', async () => {
  let response = null;
  try {
    const page_number = 2;
    response = await listUsers(page_number);
    logger.debug(`Status: ${response.status}`);
    logger.debug(`Data: ${JSON.stringify(response.data)}`);

    expect(response.status).toEqual(200);
    expect(response.data.page).toEqual(page_number);
    let found_user = false;
    for (const user of response.data.results) {
        if (user.email === infoConfig["register_user_info"]["email"] && user.name === infoConfig["register_user_info"]["name"]) {
            found_user = true;
            await setUserID(user.id);
            break;
        }
    };
    if (found_user === true) {
        logger.info('Success. Tested list users API.');
    }
    else {
      throw new Error;
    }
  } catch (error) {
    logger.error(`Failure. Test list users API failed. Status: ${response === null ? 'could not send request' : response.status}`);
  };
});

test('Test get user API', async () => {
  let response = null;
  try {
    response = await getUser(await getUserID());
    expect(response.status).toEqual(200);
    expect(response.data.name).toStrictEqual(infoConfig["register_user_info"]["name"]);
    expect(response.data.email).toStrictEqual(infoConfig["register_user_info"]["email"]);
    expect(response.data.id).toStrictEqual(await getUserID());

    logger.info('Success. Tested get user API.');
  } catch (error) {
    logger.error(`Failure. Test get user API failed. Status: ${response === null ? 'could not send request' : response.status}`);
  };
});

test('Test create user API using invalid token', async () => {
  let response = null;
  try {
    response = await createUser(
      infoConfig["register_user_info"]["email"],
      infoConfig["register_user_info"]["password"],
      infoConfig["register_user_info"]["name"],
      await getUserToken()
    );
    expect(response.status).toEqual(403);
    expect(response.data.message).toStrictEqual("Forbidden");

    logger.info('Success. Tested create user API using invalid token.');
  } catch (error) {
    logger.error(`Failure. Test create user API using invalid token failed. Status: ${response === null ? 'could not send request' : response.status}`);
  };
});

test('Test update user API with new valid password', async () => {
  let response = null;
  try {
    response = await updateUser(infoConfig["register_user_info"]["password"] + "pass", await getAdminToken(), await getUserID());
    expect(response.status).toEqual(200);
    expect(response.data).not.toBeNull();
    logger.info('Success. Tested update user API with new valid password.');
  } catch ( error ) {
    logger.error(`Failure. Test update user API with new valid password failed. Status: ${response === null ? 'could not send request' : response.status}`);
  }
});

test('Test delete user API', async () => {
  let response = null;
  try {
    response = await deleteUser(await getAdminToken(), await getUserID());
    expect(response.status).toEqual(204);
    expect(response.data).toBeNull();
    logger.info('Success. Tested delete user API.');
  } catch (error) {
    logger.error(`Failure. Test delete user API failed. Status: ${response === null ? 'could not send request' : response.status}`);
  }
})

test('Test self promote API without authorization', async () => {
  let response = null;
  try {
    response = await selfPromote("");
    expect(response.status).toEqual(401);
    expect(response.data.message).toStrictEqual("Please authenticate");
    logger.info('Success. Tested self promote API without authorization.');
  } catch (error) {
    logger.error(`Failure. Test self promote API without authorization failed. Status: ${response === null ? 'could not send request' : response.status}`);
  }
});

test('Test get self API', async () => {
  let response = null;
  try {
    response = await getSelf(await getAdminToken());
    expect(response.status).toEqual(200);
    expect(response.data.name).toStrictEqual(infoConfig["login_user_info"]["name"]);
    expect(response.data.email).toStrictEqual(infoConfig["login_user_info"]["email"]);
    logger.info('Success. Tested get self API.');
  } catch (error) {
    logger.error(`Failure. Test get self API failed. Status: ${response === null ? 'could not send request' : response.status}`);
  }
});

test('Test update self API using current password', async () => {
  let response = null;
  try {
    response = await updateSelf(infoConfig["login_user_info"]["password"], await getAdminToken());
    expect(response.status).toEqual(400);
    expect(response.data.message).toStrictEqual("New password must be different from the current password");
    logger.info('Success. Tested update self API using current password.');
  } catch (error) {
    logger.error(`Failure. Test update self API using current password failed. Status: ${response === null ? 'could not send request' : response.status}`);
  }
});