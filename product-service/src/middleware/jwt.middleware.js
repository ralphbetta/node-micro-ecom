const jwt = require('jsonwebtoken');
const { User, AccessToken } = require('../model/database');


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

            User.findOne({ where: { id: id } }).then((user) => {

                const encryptedData = decoded.userData;
                const fetchedData = user.dataValues;

                req.userData = fetchedData;



                next();

            }).catch((error) => {
                console.log(error);
            });



        } catch (err) {
            return res.status(401).json({ message: 'Authentication failed. Token invalid.' });
        }
    }
}


module.exports = TokenService;