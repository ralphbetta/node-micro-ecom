
const amqp = require('amqplib');
const rabitConfig = require('../config/rabbitMQ.config');
const { response } = require('express');

class RabbitMQ {

    constructor() {
        this.channel = null;
        this.connection = null;
    }

    static async connect(queueName) {
        const amqpServer = rabitConfig.cloud;
        this.connection = await amqp.connect(amqpServer);
        this.channel = await this.connection.createChannel();
        //const queueName = 'PRODUCT'; // Replace with your desired queue name
        await this.channel.assertQueue(queueName);
        return this.channel;
    }

    static async sendToQueue(queueName, sentData) {
        /*------------------------------
        SEND THE ORDER FROM PRODUCT SERVICE TO QUEUE IN THE ORDER SERVICD
        --------------------------------*/
        this.channel.sendToQueue(
            queueName,
            Buffer.from(
                JSON.stringify(sentData)
            )
        );
    }

    static async readFromQueue(queueName) {

        this.channel.consume(queueName, data => {
            let response = JSON.parse(data.content);
            this.channel.ack(data);
            console.log(response);
            return response;
        });

    }


    static async monitorQueues(channel) {

        channel.consume('REPORTINGSERVICE', response => {
            const info = JSON.parse(response.content);
            const data = JSON.stringify(info.data);
            channel.ack(response); //acknowledge the item in the queue
            console.log(data);
            if (info.type === 'TESTPRODUCT') {
                
                RabbitMQ.sendToQueue("PRODUCT", { "status": `Seen. Item sent: ${data}` }
                );
            }
         
        });



    }










}

module.exports = RabbitMQ;