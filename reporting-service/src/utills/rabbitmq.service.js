
const amqp = require('amqplib');
const rabitConfig = require('../config/rabbitMQ.config');
const { response } = require('express');
const ProductController = require('../controller/product.controller');

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
            console.log(`this is the streamed ${data}`);
            if (info.type === 'CREATEPRODUCT') {
                ProductController.createProduct(data);
                RabbitMQ.sendToQueue("PRODUCT", { "status": `Seen. Item sent: ${data}` }
            );
            }else if (info.type == 'UPDATEPRODUCT'){
                ProductController.updateProduct(data);
            }
         
        });



    }










}

module.exports = RabbitMQ;