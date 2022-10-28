const mongoose = require(`mongoose`)


const CONNECTION_StRING = `mongodb://localhost:27017/gallery`

module.exports = async (app) => {
        try {
            await mongoose.connect(CONNECTION_StRING, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            console.log(`database Connected`)
        } catch (error) {
              console.log(error.message)
              process.exit(1)          
        }
}