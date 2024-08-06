const fs = require('fs').promises;
const path = require('path');

const ADMIN_TOKEN_FILE = path.join(__dirname, '../temp_files/admin_token.txt');
const USER_TOKEN_FILE = path.join(__dirname, '../temp_files/user_token.txt');
const USER_ID_FILE = path.join(__dirname, '../temp_files/user_id.txt');

async function store_admin_token(token) {
    try {
        await fs.writeFile(ADMIN_TOKEN_FILE, token);
        // console.log("Storing admin token: ", token);
    } catch (error) {
        console.error("Error storing admin token:", error);
    }
}

async function get_admin_token() {
    try {
        const token = await fs.readFile(ADMIN_TOKEN_FILE, 'utf8');
        // console.log("Admin token is: ", token);
        return token;
    } catch (error) {
        console.error("Error reading admin token:", error);
        return null;
    }
}

async function store_user_token(token) {
    try {
        await fs.writeFile(USER_TOKEN_FILE, token);
        // console.log("Storing user token: ", token);
    } catch (error) {
        console.error("Error storing user token:", error);
    }
}

async function get_user_token() {
    try {
        const token = await fs.readFile(USER_TOKEN_FILE, 'utf8');
        // console.log("User token is: ", token);
        return token;
    } catch (error) {
        console.error("Error reading user token:", error);
        return null;
    }
}

async function store_user_id(id) {
    try {
        await fs.writeFile(USER_ID_FILE, id);
        // console.log("Storing user ID: ", id);
    } catch (error) {
        console.error("Error storing user ID:", error);
    }
}

async function get_user_id() {
    try {
        const id = await fs.readFile(USER_ID_FILE, 'utf8');
        // console.log("User ID is: ", id);
        return id;
    } catch (error) {
        console.error("Error reading user ID:", error);
        return null;
    }
}

module.exports = { 
    store_admin_token, get_admin_token, 
    store_user_token, get_user_token,
    store_user_id, get_user_id 
};
