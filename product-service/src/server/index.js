const express = require("express");
const cors = require("cors");
require('dotenv').config();
const app = express();
const { db } = require("../model/database/index");
const PORT = process.env.PORT || 8080;
const IndexRoute = require('../routes/index');
const RabbitMQ = require('../utills/rabbitmq.service');
const rabitConfig = require('../config/rabbitMQ.config');
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


        /*----------- INITIALIZE DATABASE ----------------*/
        db.sequelize.sync()
            .then(() => {
                console.log("Synced db.");
            })
            .catch((err) => {
                console.log("Failed to sync db: " + err.message);
            });


        /*----------- REGISTERED RABBIT-MQ ----------------*/
        var channel;

        RabbitMQ.connect('PRODUCT').then((response) => {
            channel = response;
        });


        app.get("/sendtoreportpro", async (req, res) => {

            // Send a JSON message
            const jsonMessage = {
                type: 'TESTPRODUCT',
                data: {
                    name: 'John',
                    age: 30,
                },
            };

            RabbitMQ.sendToQueue("REPORTINGSERVICE", jsonMessage);


            channel.consume('PRODUCT', data => {
                const parsedResponse = JSON.parse(data.content);
                console.log("Returned response:", parsedResponse);
                channel.ack(data);
            });


            res.json({ message: "Welcome Product Service Route" })

        });


        /*-----------------------------------------------*/


        /*----------- DEFAULT ROUTE ----------------*/
        app.get("/", (req, res) => {
            res.json({ message: "Welcome Product Service Route" })
        });

        IndexRoute(app).register();


        const server = app.listen(PORT, () => {
            console.log(`Product Service running at http://127.0.0.1:${PORT}`);
            /*-----------xxx SOCKET CONFIGURATION START ----------------*/

        });

    }

}

module.exports = Server;