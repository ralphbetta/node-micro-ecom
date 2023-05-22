
const amqp = require('amqplib');
const rabitConfig = require('../config/rabbitMQ.config');

class RabbitMQ {

    constructor() {
        this.channel = null;
        this.connection = null;
    }

    static async connect() {
        const amqpServer = rabitConfig.cloud;
        this.connection = await amqp.connect(amqpServer);
        this.channel = await this.connection.createChannel();
        const queueName = 'PRODUCT'; // Replace with your desired queue name
        await this.channel.assertQueue(queueName);
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
            let order = JSON.parse(data.content);
            console.log("Consuming Product queue");
            console.log(order.newOrder);
            this.channel.ack(data);
            return order;
        });
    }

}

module.exports = RabbitMQ;