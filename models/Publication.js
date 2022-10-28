const { Schema, model, Types} = require(`mongoose`)

const URL_PATTERN = /https?:\/\/./i;

const publicationSchema = new Schema({
    title: {type: String, required: true, minlength: [6, `Title is too short`]},
    technique: {type: String, required: true, maxlength: [15, `Painting technique is too long`]},
    certificate: {type: String, required: true, enum: [`Yes`, `No`]},
    imageUrl: {type: String, validate: {
                    validator: (value) => {URL_PATTERN.test(value)},
                    message: `Invalid URL`
    }},
    author: {type: Types.ObjectId, ref:`User`},
    usersShared : {type : [Types.ObjectId], ref: `User`, default: []}
})

publicationSchema.index({title: 1}, {
    collation: {
        locale: `en`,
        strength: 2
    }
})

const Publication = model(`Publication`, publicationSchema)

module.exports = {Publication}