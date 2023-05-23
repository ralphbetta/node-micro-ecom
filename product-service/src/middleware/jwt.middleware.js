const jwt = require('jsonwebtoken');
const { User, AccessToken } = require('../model/database');
const axios = require('axios');


class TokenService {

    static generateToken = (userdata) => {
        return jwt.sign({ userdata }, process.env.JWT_SECRETE, { expiresIn: "3d" });
    }


    static verifyToken = (req, res, next) => {

        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Authentication failed. Token missing.' });
        }

        try {

            const decoded = jwt.verify(token, process.env.JWT_SECRETE);
            const id = decoded.userdata.id;
            const url = `http://127.0.0.1:8585/api/auth/verify-token/${id}`;

            console.log("verifying user toke....");
            console.log(url);

            axios.get(url).then((response) => {
                console.log(response.data);
                req.userData = response.data;
                next();
            }).catch((error) => {
                return res.status(500).json({ message: 'Authentication Internal Service Error' });
            });

        } catch (err) {
            return res.status(401).json({ message: 'Authentication failed. Token invalid.' });
        }
    }
}


module.exports = TokenService;