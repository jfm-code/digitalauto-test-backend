const logger = require('../helper_functions/logger');
const { writeSummary } = require('../helper_functions/logsummary');
const { sendEmail } = require('../request_functions/email');
const infoConfig = require('../helper_functions/info_config');

beforeAll(() => {
  logger.startEnd('Start testing backend-core/v2/emails methods');
});

afterAll(() => {
  logger.startEnd('Finish testing backend-core/v2/emails methods');
  writeSummary(logger)
});

test('Test send email API', async () => {
    try {
        const response = await sendEmail(
            infoConfig["login_user_info"]["email"],
            infoConfig["email_content"],
            infoConfig["email_content"]
        );
        // logger.debug(`Status: ${response.status}`);
        // logger.debug(`Data: ${JSON.stringify(response.data)}`);

        expect(response.status).toEqual(200);
        expect(response.data).toBeNull();
        logger.info('Success. Tested send email API.')
    } catch (error) {
        logger.error('Failure. Test send email API failed.');
    }
});