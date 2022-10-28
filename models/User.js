const { Schema, model} = require(`mongoose`)

//TODO add User properties and validation from assignment
const userSchema = new Schema ({
    username: {type: String, required: true, unique: true, milength: [4,`Username must be at least 4 characters long`]},
    hashedPassword: { type: String, required: true, milength: [3, `Password must be at least 3 characters long`]},
    address: {type: String, required: true, maxlength: [20,`Address is too long`]}
})

userSchema.index({username:1}, {
    collation: {
        locale: `en`,
        strength: 2
    }
})
const User = model(`User`,userSchema)

module.exports= User