const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { getUserById } = require('../utils/index');
dotenv.config();

const auth = async (req, res, next) => {
    try {
        let token = req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer';
        if (token) {
            token = req.headers.authorization.split(' ')[1];
            const { id: userId } = jwt.verify(token, process.env.KEY);

            const user = getUserById(userId);
            if (!user) {
                return res.status(404).json({ status: false, message: `User not found` });
            }

            const { username, email } = user;
            req.user = { username, email, userId };
            next();
        } else {
            return res.status(401).json({ status: false, message: `Unauthorized access` });
        }
    } catch (error) {
        res.status(401).json({ status: false, error: error.message });
    }
};

module.exports = auth;
