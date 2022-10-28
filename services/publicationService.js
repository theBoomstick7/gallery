const {Publication} = require(`../models/Publication`)

async function getAll() {
    return Publication.find({}).lean()
}
async function getById(id) {
    return Publication.findById(id).populate(`author`).lean()
}
async function deletePublication(id){
    return Publication.findByIdAndDelete(id)
}
async function createPublication(data){
    return Publication.create(data)
}
async function editPublication(id,data){
    const current = await Publication.findById(id)

    current.title = data.title
    current.technique = data.technique
    current.imageUrl = data.imageUrl
    current.certificate = data.certificate

    return current.save()
}
async function sharePublication(publicationId, userId){
    const current = await Publication.findById(publicationId)

    current.usersShared.push(userId)

    return current.save()

}
async function getbyUserShared(userId){
    return Publication.find({ usersShared : userId}).lean()
}
async function getByAuthor(userId){
    return  Publication.find({author : userId}).lean()
}

module.exports = {
    getAll,
    getById,
    deletePublication,
    createPublication,
    editPublication,
    sharePublication,
    getbyUserShared,
    getByAuthor
    
}