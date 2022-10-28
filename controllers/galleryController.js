const { getAll, createPublication, getById, sharePublication, deletePublication, editPublication, getbyUserShared,getByAuthor } = require("../services/publicationService")
const { parseError } = require(`../util/parser`)
const {hasUser, isGuest} = require(`../middlewares/guards`)
const { getUserById } = require("../services/userService")


const galleryController = require(`express`).Router()

galleryController.get(`/`, async(req,res) => {
    const publications = await getAll()

    res.render(`gallery`, {
        title: `Gallery`,
        publications
    })
})

galleryController.get(`/create`, hasUser() ,async ( req, res ) => {
    res.render(`create`,
    {
        title : `Create Publication`,
        body: req.body
    })
})

galleryController.post(`/create`, async(req,res) => {
    const publication = {
        title : req.body.title,
        technique : req.body.technique,
        imageUrl : req.body.imageUrl,
        certificate : req.body.certificate,
        author : req.user._id
    }

    try {
        await createPublication(publication)
        res.redirect(`/gallery`)
    } catch (error) {
        res.render(`create`,{
            title: `Create publication`,
            errors : parseError(error),
            body : req.body
        })
    }
})
galleryController.get(`/profile`, async (req,res) => {
    
    const profile = await getUserById(req.user._id)
    

   const result = await getbyUserShared(req.user._id)
    
    const created = await getByAuthor(req.user._id)
    

    if(result){
        profile.shared = result.map(r => r.title).join(`, `)
    }
    if(created){
        profile.created = created.map(c => c.title).join(`, `)
    }
   
    res.render(`profile`,
    {
        title : `User profile`,
        profile
    })
})

galleryController.get(`/:id`,  hasUser() ,async ( req, res) => {
    const publication = await getById(req.params.id)
    
    if(req.user){
       
        if(req.user._id.toString() == publication.author._id.toString()){
            publication.isAuthor = true
        }
        if(publication.usersShared.map(u => u.toString()).includes(req.user._id)){
            publication.isShared = true
        }
    
    }

    res.render(`details`, {
        title : `Details`,
        publication
    })
})

galleryController.get(`/:id/share`,  hasUser() ,async(req,res) => {
    const publication = await getById(req.params.id)

    if(req.user._id.toString() != publication.author._id.toString()){
        await sharePublication(req.params.id, req.user._id)
    }
    return res.redirect(`/`)
})
galleryController.get(`/:id/delete`,  hasUser() ,async (req,res) => {
    
    const publication = await getById(req.params.id)

    if(req.user._id.toString() == publication.author._id.toString()){
        await deletePublication(req.params.id)
    }
    return res.redirect(`/`)

   

})

galleryController.get(`/:id/edit`,  hasUser() ,async(req,res) => {
    const publication = await getById(req.params.id)

    res.render(`edit`, {
        title: `Edit Publication`,
        publication
    })
})

galleryController.post(`/:id/edit`, async (req,res) => {
    

    try {
        await editPublication(req.params.id, req.body)
        res.redirect(`/gallery/${req.params.id}`)
    } catch (error) {
        res.render(`edit`, {
            title: `Edit Page`,
            publication : req.body,
            errors: parseError(error)
        })
    }
})
module.exports = galleryController