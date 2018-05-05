const Queue = require('bee-queue')

module.exports = (serviceOptions) => {
    return {
        name: 'beeQueue',
        methods: {
            createJob (name, payload) {
                return this.getQueueByName(name).createJob(payload)
            },
            getQueueByName (name) {
                if (!this.$queues[name]) {
                    this.$queues[name] = new Queue(name, serviceOptions)
                }
                return this.$queues[name]
            }
        },
        created () {
            // intertal queue cache
            this.$queues = {}

            if (this.schema.queues) {
                Object.keys(this.schema.queues).forEach(name => {
                    const queueHandler = this.schema.queues[name]
                    this.getQueueByName(name).process(queueHandler.bind(this))
                })
            }
            return Promise.resolve()
        }
    }
}
