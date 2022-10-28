const bcrypt = require(`bcrypt`)
const jwt = require(`jsonwebtoken`)
const User = require(`../models/User`)

const JWT_TOKEN = `fafsage3gt230tr32tgds`

async function register(username, password,address) {
    const existing = await User.findOne({username}).collation({locale: `en`, strength: 2})
    if (existing){
        throw new Error(`Username is taken`)
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        username,
        hashedPassword,
        address
    })
    // TODO see if reg creates user session
        return createSession(user)


}

async function login(username, password) {
    const user = await User.findOne({username}).collation({locale: `en`, strength: 2})
    if(!user){
        throw new Error (`Incorrect username or password`)
    }

   const result =  await bcrypt.compare(password, user.hashedPassword)

    if (result == false) {
    throw new Error(`Incorrect username or password`);
    }
    return createSession(user);
}

function createSession({_id, username}){
    const payload = {
        _id,
        username
    }

    return jwt.sign(payload, JWT_TOKEN)
}

function verifyToken(token){
    return jwt.verify(token, JWT_TOKEN)
}

async function getUserById(id){
    return User.findById(id).lean()
}


module.exports = {
    register,
    login,
    verifyToken,
    getUserById,
    
    
}