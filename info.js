require('dotenv').config()

module.exports = {
    "company_domain": process.env.COMPANY_DOMAIN,
    "proxy_url": process.env.PROXY_URL,
    "login_url": process.env.LOGIN_URL,
    "login_user_info": 
    {
        "email": process.env.ADMIN_EMAIL,
        "password": process.env.ADMIN_PASSWORD,
        "name": process.env.ADMIN_NAME
    },
    "forgot_pwd_url": process.env.FORGOT_PWD_URL,
    "register_url": process.env.REGISTER_URL,
    "register_user_info": 
    {
        "email": process.env.NEW_USER_EMAIL,
        "password": process.env.NEW_USER_PASSWORD,
        "name": process.env.NEW_USER_NAME
    },
    "user_url": process.env.USER_URL,
    "self_url": process.env.SELF_URL,
    "model_url": process.env.MODEL_URL,
    "send_email_url": process.env.EMAIL_URL,
    "prototype_url": process.env.PROTOTYPE_URL,
    "random_prototype_id": process.env.RANDOM_PROTOTYPE_ID,
    "test_model_name": "Automation Test Model",
    "email_content": "This is an automation test email.",
    "test_prototype_name": "Automation Test Prototype"
}