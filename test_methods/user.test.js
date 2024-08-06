const logger = require('../helper_functions/logger');
const { writeSummary } = require('../helper_functions/logsummary');
const { listUsers, getUser, deleteUser, updateUser, selfPromote, getSelf, updateSelf, createUser } = require('../helper_functions/user');
const { getAdminToken, setUserID, getUserID, getUserToken } = require('../helper_functions/temp_storage');
const infoConfig = require('../helper_functions/info_config');

beforeAll(() => {
  logger.startEnd('Start testing backend-core/v2/user methods');
});

afterAll(() => {
  logger.startEnd('Finish testing backend-core/v2/user methods');
  writeSummary(logger)
});

test('Test list users API', async () => {
  try {
    const page_number = 2;
    const response = await listUsers(page_number);
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
    logger.error('Failure. Test list users API.');
  };
});

test('Test get user API', async () => {
  try {
    const response = await getUser(await getUserID());
    expect(response.status).toEqual(200);
    expect(response.data.name).toStrictEqual(infoConfig["register_user_info"]["name"]);
    expect(response.data.email).toStrictEqual(infoConfig["register_user_info"]["email"]);
    expect(response.data.id).toStrictEqual(await getUserID());

    logger.info('Success. Tested get user API.');
  } catch (error) {
    logger.error('Failure. Test get user API failed.', error);
  };
});

test('Test create user API using invalid token', async () => {
  try {
    const response = await createUser(
      infoConfig["register_user_info"]["email"],
      infoConfig["register_user_info"]["password"],
      infoConfig["register_user_info"]["name"],
      await getUserToken()
    );
    expect(response.status).toEqual(403);
    expect(response.data.message).toStrictEqual("Forbidden");

    logger.info('Success. Tested create user API using invalid token.');
  } catch (error) {
    logger.error('Failure. Test create user API using invalid token failed.', error);
  };
});

test('Test update user API with new valid password', async () => {
  try {
    const response = await updateUser(infoConfig["register_user_info"]["password"] + "pass", await getAdminToken(), await getUserID());
    expect(response.status).toEqual(200);
    expect(response.data).not.toBeNull();
    logger.info('Success. Tested update user API with new valid password.');
  } catch ( error ) {
    logger.error('Failure. Test update user API with new valid password failed.', error);
  }
});

test('Test delete user API', async () => {
  try {
    const response = await deleteUser(await getAdminToken(), await getUserID());
    expect(response.status).toEqual(204);
    expect(response.data).toBeNull();
    logger.info('Success. Tested delete user API.');
  } catch (error) {
    logger.error('Failure. Test delete user API failed.');
  }
})

test('Test self promote API without authorization', async () => {
  try {
    const response = await selfPromote("");
    expect(response.status).toEqual(401);
    expect(response.data.message).toStrictEqual("Please authenticate");
    logger.info('Success. Tested self promote API without authorization.');
  } catch (error) {
    logger.error('Failure. Test self promote API without authorization failed.');
  }
});

test('Test get self API', async () => {
  try {
    const response = await getSelf(await getAdminToken());
    expect(response.status).toEqual(200);
    expect(response.data.name).toStrictEqual(infoConfig["login_user_info"]["name"]);
    expect(response.data.email).toStrictEqual(infoConfig["login_user_info"]["email"]);
    logger.info('Success. Tested get self API.');
  } catch (error) {
    logger.error('Failure. Test get self API failed.');
  }
});

test('Test update self API using current password', async () => {
  try {
    const response = await updateSelf(infoConfig["login_user_info"]["password"], await getAdminToken());
    expect(response.status).toEqual(400);
    expect(response.data.message).toStrictEqual("New password must be different from the current password");
    logger.info('Success. Tested update self API using current password.');
  } catch (error) {
    logger.error('Failure. Test update self API using current password failed.');
  }
});