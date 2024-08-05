const logger = require('../helper_functions/logger');
const { write_summary } = require('../helper_functions/logsummary');
const { login, forgot_password } = require('../helper_functions/auth');
const infoConfig = require('../helper_functions/info_config');

beforeAll(() => {
  logger.start_end('Start testing backend-core/v2/auth methods');
});

afterAll(() => {
  logger.start_end('Finish testing backend-core/v2/auth methods');
  write_summary(logger)
});

test('Test login API using correct user information', async () => {
  try {
    const response = await login(
      infoConfig["login_user_info"]["email"], 
      infoConfig["login_user_info"]["password"]
    );
    logger.debug(`Status: ${response.status}`);
    logger.debug(`Data: ${JSON.stringify(response.data)}`);

    expect(response.status).toEqual(200);
    expect(response.data.user).toStrictEqual(infoConfig["login_expect_result"]);
    expect(response.data.tokens.access.token).toBeDefined();
    expect(response.data.tokens.access.expires).toBeDefined();

    logger.info('Success. Tested login API with correct user information.')
  } catch (error) {
    console.log(error);
    logger.error('Failure. Test login API with correct user information failed.');
  }
});

test('Test login API using wrong user information', async () => {
  try {
    const response = await login(
      infoConfig["login_user_info"]["email"] + ".vn",
      infoConfig["login_user_info"]["password"]
    );
    logger.debug(`Status: ${response.status}`);
    logger.debug(`Data: ${JSON.stringify(response.data)}`);

    expect(response.status).toEqual(401);
    expect(response.data.message).toStrictEqual("Incorrect email or password");
    
    logger.info('Success. Tested login API with wrong user information.')
  } catch (error) {
    console.log(error);
    logger.error('Failure. Test login API with wrong user information failed.');
  }
});

test('Test login API using empty user information', async () => {
  try {
    const response = await login("", "");
    logger.debug(`Status: ${response.status}`);
    logger.debug(`Data: ${JSON.stringify(response.data)}`);

    expect(response.status).toEqual(400);
    expect(response.data.message).toStrictEqual("\"email\" is not allowed to be empty, \"password\" is not allowed to be empty");
    
    logger.info('Success. Tested login API with empty user information.')
  } catch (error) {
    console.log(error);
    logger.error('Failure. Test login API with empty user information failed.');
  }
});

test('Test forgot password API using correct user email', async () => {
  try {
    const response = await forgot_password("dev@gmail.com");
    logger.debug(`Status: ${response.status}`);
    expect(response.status).toEqual(204);
    expect(response.data).toBeNull();
    logger.info('Success. Tested forgot password API using correct user email.')
  } catch (error) {
    console.log(error);
    logger.error('Failure. Test forgot password API using correct user email failed.');
  }
});

test('Test forgot password API using wrong user email', async () => {
  try {
    const response = await forgot_password("random@gmail.com");
    logger.debug(`Status: ${response.status}`);
    logger.debug(`Data: ${JSON.stringify(response.data)}`);

    expect(response.status).toEqual(404);
    expect(response.data.message).toStrictEqual("No users found with this email");

    logger.info('Success. Tested forgot password API using wrong user email.')
  } catch (error) {
    console.log(error);
    logger.error('Failure. Test forgot password API using wrong user email failed.');
  }
});

test('Test forgot password API using empty user email', async () => {
  try {
    const response = await forgot_password("");
    logger.debug(`Status: ${response.status}`);
    logger.debug(`Data: ${JSON.stringify(response.data)}`);

    expect(response.status).toEqual(400);
    expect(response.data.message).toStrictEqual("\"email\" is not allowed to be empty");

    logger.info('Success. Tested forgot password API using empty user email.')
  } catch (error) {
    console.log(error);
    logger.error('Failure. Test forgot password API using empty user email failed.');
  }
});