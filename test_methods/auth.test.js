const logger = require('../helper_functions/logger');
const { writeSummary } = require('../helper_functions/logsummary');
const { login, forgotPassword, register } = require('../request_functions/auth');
const { setAdminToken, setUserToken } = require('../helper_functions/temp_storage');
const infoConfig = require('../helper_functions/info_config');

beforeAll(() => {
  logger.startEnd('Start testing backend-core/v2/auth methods');
});

afterAll(() => {
  logger.startEnd('Finish testing backend-core/v2/auth methods');
  writeSummary(logger)
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
    expect(response.data.user.role).toStrictEqual("user");
    expect(response.data.user.email).toStrictEqual(infoConfig["login_user_info"]["email"]);
    expect(response.data.user.name).toStrictEqual(infoConfig["login_user_info"]["name"]);
    expect(response.data.user.id).toBeDefined();
    expect(response.data.user.created_at).toBeDefined();
    expect(response.data.tokens.access.token).toBeDefined();
    await setAdminToken(response.data.tokens.access.token);
    expect(response.data.tokens.access.expires).toBeDefined();

    logger.info('Success. Tested login API with correct user information.')
  } catch (error) {
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
    logger.error('Failure. Test login API with wrong user information failed.');
  }
});

test('Test login API using empty user information', async () => {
  try {
    const response = await login("", "");

    expect(response.status).toEqual(400);
    expect(response.data.message).toStrictEqual("\"email\" is not allowed to be empty, \"password\" is not allowed to be empty");
    
    logger.info('Success. Tested login API with empty user information.')
  } catch (error) {
    logger.error('Failure. Test login API with empty user information failed.');
  }
});

test('Test forgot password API using correct user email', async () => {
  try {
    const response = await forgotPassword("dev@gmail.com");

    expect(response.status).toEqual(204);
    expect(response.data).toBeNull();

    logger.info('Success. Tested forgot password API using correct user email.')
  } catch (error) {
    logger.error('Failure. Test forgot password API using correct user email failed.');
  }
});

test('Test forgot password API using wrong user email', async () => {
  try {
    const response = await forgotPassword("random@gmail.com");

    expect(response.status).toEqual(404);
    expect(response.data.message).toStrictEqual("No users found with this email");

    logger.info('Success. Tested forgot password API using wrong user email.')
  } catch (error) {
    logger.error('Failure. Test forgot password API using wrong user email failed.');
  }
});

test('Test forgot password API using empty user email', async () => {
  try {
    const response = await forgotPassword("");

    expect(response.status).toEqual(400);
    expect(response.data.message).toStrictEqual("\"email\" is not allowed to be empty");

    logger.info('Success. Tested forgot password API using empty user email.')
  } catch (error) {
    logger.error('Failure. Test forgot password API using empty user email failed.');
  }
});

test('Test register API using existing email', async () => {
  try {
    const response = await register(
      infoConfig["login_user_info"]["email"],
      infoConfig["register_user_info"]["password"],
      infoConfig["register_user_info"]["name"]);
  
      expect(response.status).toEqual(400);
      expect(response.data.message).toStrictEqual("Email already taken");
  
      logger.info('Success. Tested register API using existing email.')
    } catch (error) {
      logger.error('Failure. Test register API using existing email failed.');
    }
});

test('Test register API using empty or invalid input', async () => {
  try {
    const response = await register(
    infoConfig["register_user_info"]["email"].slice(0, 15),
    infoConfig["register_user_info"]["password"].slice(0, 4), "");

    expect(response.status).toEqual(400);
    expect(response.data.message).toStrictEqual("\"email\" must be a valid email, password must be at least 8 characters, \"name\" is not allowed to be empty");

    logger.info('Success. Tested register API using empty or invalid input.')
  } catch (error) {
    logger.error('Failure. Test register API using empty or invalid input failed.');
  }
});

test('Test register API using correct input', async () => {
  try {
    const response = await register(
      infoConfig["register_user_info"]["email"],
      infoConfig["register_user_info"]["password"],
      infoConfig["register_user_info"]["name"]
    );

    expect(response.status).toEqual(201);
    expect(response.data.user.email).toStrictEqual(infoConfig["register_user_info"]["email"]);
    expect(response.data.user.name).toStrictEqual(infoConfig["register_user_info"]["name"]);
    await setUserToken(response.data.tokens.access.token);

    logger.info('Success. Tested register API using correct input.')
  } catch (error) {
    logger.error('Failure. Test register API using correct input failed.');
  }
});