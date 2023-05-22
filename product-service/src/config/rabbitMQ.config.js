const rabitConfig = {
    cloud: process.env.RABBITMQ_URL,
    local: "amqp://localhost:5672"
}

module.exports = rabitConfig;