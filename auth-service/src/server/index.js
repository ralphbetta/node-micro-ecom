const express = require("express");
const cors = require("cors");
require('dotenv').config();
const app = express();

class Server {

    static boot() {

        // Define CORS options
        const corsOptions = {
            origin: "http://localhost:8081", // Specify the allowed origin
            methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the allowed HTTP methods
            allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
            credentials: true, // Enable sending cookies across different domains
            preflightContinue: false, // Disable preflight caching
            optionsSuccessStatus: 200 // Specify the status code to use for successful OPTIONS requests
        };

        app.use(cors(corsOptions));

        /*----------- DEFAULT ROUTE ----------------*/
        app.get("/", (req, res) => { res.json({ message: "Welcome to Node App" }) });

        const PORT = process.env.PORT || 8080;

        const server = app.listen(PORT, () => {
            console.log(`Server is running http://127.0.0.1:${PORT}`);
         /*----------- SOCKET CONFIGURATION START ----------------*/

        });

    }

}

module.exports = Server;