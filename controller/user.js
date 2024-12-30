const { findByEmail, findByUserName, insertUser, checkPassword, createToken } = require('../utils/index');

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ status: false, message: `All fields must be filled` });
        }

        if (findByUserName(username)) {
            return res.status(400).json({ status: false, message: `Username already exists, please choose another` });
        }

        if (findByEmail(email)) {
            return res.status(400).json({ status: false, message: `User already registered, please login` });
        }

        await insertUser(username, email, password);
        return res.status(201).json({ status: true, message: `Registered successfully` });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ status: false, message: `All fields must be filled` });
        }

        const user = findByEmail(email);
        if (!user) {
            return res.status(404).json({ status: false, message: `User not found, please register` });
        }

        const isPasswordValid = await checkPassword(user.password, password);
        if (!isPasswordValid) {
            return res.status(401).json({ status: false, message: `Unauthorized access` });
        }

        const token = createToken(user.u_id);
        return res.status(200).json({ status: true, message: `Login successful`, token });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

module.exports = { register, login };
