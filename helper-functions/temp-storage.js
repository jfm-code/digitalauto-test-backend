const fs = require('fs').promises;
const path = require('path');

const ADMIN_TOKEN_FILE = path.join(__dirname, '../temp-files/admin-token.txt');
const USER_TOKEN_FILE = path.join(__dirname, '../temp-files/user-token.txt');
const USER_ID_FILE = path.join(__dirname, '../temp-files/user-id.txt');
const PUBLIC_MODEL_ID_FILE = path.join(__dirname, '../temp-files/public-model-id.txt')
const PRIVATE_MODEL_ID_FILE = path.join(__dirname, '../temp-files/private-model-id.txt')
const PUBLIC_PROTOTYPE_ID_FILE = path.join(__dirname, '../temp-files/public-prototype-id.txt')
const PRIVATE_PROTOTYPE_ID_FILE = path.join(__dirname, '../temp-files/private-prototype-id.txt')

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

async function setPublicModelID(id) {
    try {
        await fs.writeFile(PUBLIC_MODEL_ID_FILE, id);
        // console.log("Storing public model ID: ", id);
    } catch (error) {
        console.error("Error storing public model ID:", error);
    }
}

async function getPublicModelID() {
    try {
        const id = await fs.readFile(PUBLIC_MODEL_ID_FILE, 'utf8');
        // console.log("Public model ID is: ", id);
        return id;
    } catch (error) {
        console.error("Error reading public model ID:", error);
        return null;
    }
}

async function setPrivateModelID(id) {
    try {
        await fs.writeFile(PRIVATE_MODEL_ID_FILE, id);
        // console.log("Storing private model ID: ", id);
    } catch (error) {
        console.error("Error storing private model ID:", error);
    }
}

async function getPrivateModelID() {
    try {
        const id = await fs.readFile(PRIVATE_MODEL_ID_FILE, 'utf8');
        // console.log("Private model ID is: ", id);
        return id;
    } catch (error) {
        console.error("Error reading private model ID:", error);
        return null;
    }
}

async function setPublicPrototypeID(id) {
    try {
        await fs.writeFile(PUBLIC_PROTOTYPE_ID_FILE, id);
        // console.log("Storing public prototype ID: ", id);
    } catch (error) {
        console.error("Error storing public prototype ID:", error);
    }
}

async function getPublicPrototypeID() {
    try {
        const id = await fs.readFile(PUBLIC_PROTOTYPE_ID_FILE, 'utf8');
        // console.log("Private public prototype ID is: ", id);
        return id;
    } catch (error) {
        console.error("Error reading public prototype ID:", error);
        return null;
    }
}

async function setPrivatePrototypeID(id) {
    try {
        await fs.writeFile(PRIVATE_PROTOTYPE_ID_FILE, id);
        // console.log("Storing private prototype ID: ", id);
    } catch (error) {
        console.error("Error storing private prototype ID:", error);
    }
}

async function getPrivatePrototypeID() {
    try {
        const id = await fs.readFile(PRIVATE_PROTOTYPE_ID_FILE, 'utf8');
        // console.log("Private private prototype ID is: ", id);
        return id;
    } catch (error) {
        console.error("Error reading private prototype ID:", error);
        return null;
    }
}

module.exports = { 
    setAdminToken, getAdminToken, 
    setUserToken, getUserToken,
    setUserID, getUserID,
    setPublicModelID, getPublicModelID,
    setPrivateModelID, getPrivateModelID,
    setPublicPrototypeID, getPublicPrototypeID,
    setPrivatePrototypeID, getPrivatePrototypeID
};

setPrivatePrototypeID("asfhkufhaiur");
