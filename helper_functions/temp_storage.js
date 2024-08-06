const fs = require('fs').promises;
const path = require('path');

const ADMIN_TOKEN_FILE = path.join(__dirname, '../temp_files/admin_token.txt');
const USER_TOKEN_FILE = path.join(__dirname, '../temp_files/user_token.txt');
const USER_ID_FILE = path.join(__dirname, '../temp_files/user_id.txt');

async function setAdminToken(token) {
    try {
        await fs.writeFile(ADMIN_TOKEN_FILE, token);
        // console.log("Storing admin token: ", token);
    } catch (error) {
        console.error("Error storing admin token:", error);
    }
}

async function getAdminToken() {
    try {
        const token = await fs.readFile(ADMIN_TOKEN_FILE, 'utf8');
        // console.log("Admin token is: ", token);
        return token;
    } catch (error) {
        console.error("Error reading admin token:", error);
        return null;
    }
}

async function setUserToken(token) {
    try {
        await fs.writeFile(USER_TOKEN_FILE, token);
        // console.log("Storing user token: ", token);
    } catch (error) {
        console.error("Error storing user token:", error);
    }
}

async function getUserToken() {
    try {
        const token = await fs.readFile(USER_TOKEN_FILE, 'utf8');
        // console.log("User token is: ", token);
        return token;
    } catch (error) {
        console.error("Error reading user token:", error);
        return null;
    }
}

async function setUserID(id) {
    try {
        await fs.writeFile(USER_ID_FILE, id);
        // console.log("Storing user ID: ", id);
    } catch (error) {
        console.error("Error storing user ID:", error);
    }
}

async function getUserID() {
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
    setAdminToken, getAdminToken, 
    setUserToken, getUserToken,
    setUserID, getUserID 
};
