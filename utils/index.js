const user = require('../model/user.json');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const book = require('../model/book.json')


const findByEmail = (email) => {
    return user.find((data) => data.email === email);
};


const insertUser = async (username, email, password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = {
        u_id: uuidv4(),
        username,
        email,
        password: hashedPassword,
    };

    const updatedUsers = [...user, newUser];
    const filePath = path.join(__dirname, '../model/user.json');
    fs.writeFileSync(filePath, JSON.stringify(updatedUsers, null, 2));
    return newUser;
};


const checkPassword = async (hashedPassword, plainPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};


const createToken = (id) => {
    return jwt.sign({ id }, process.env.KEY);
};


const getUserById = (userId) => {
    return user.find((data) => data.u_id === userId) || null;
};


const findByUserName = (username) => {
    return user.find((x) => x.username === username);
};


const insertDB = async (data, filename) => {
    const filepath = path.join(__dirname, `../model/${filename}.json`)
    const w = await fs.writeFileSync(filepath, JSON.stringify(data, null, 2))
    return w
}


module.exports = {
    insertUser,
    checkPassword,
    createToken,
    getUserById,
    findByEmail,
    findByUserName,
    insertDB
};

// sumanth : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhhMDhkYmM1LTM4ZWMtNDY3Ny04MGRlLThiMzFiY2QwNjQ0ZSIsImlhdCI6MTczNTQ4NTEyNX0.L9e0TO_T3PleX4Lnl2_ZDsc11EjSsp3dF3KOIeNqPrk
// shiva : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFlMDEwYzc3LTU2MDYtNDU0OC04YTgyLTNkNWE5OTA2ZGI1NiIsImlhdCI6MTczNTQ4NTEwM30.FyIY1fbSKNAgZhARHnVFaXcYmERU5gvpsvtF2aP194I