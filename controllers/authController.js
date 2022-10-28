const { register, login } = require(`../services/userService`)
const { parseError } = require("../util/parser")
const {hasUser, isGuest} = require(`../middlewares/guards`)


const authController = require(`express`).Router()

authController.get(`/register`, isGuest() ,(req,res) => {
    res.render(`register`, {
        title: `Register page`
    })
})

authController.post(`/register`, async (req,res) => {
    try {
       
        if(req.body.username == `` || req.body.password == ``){
            throw new Error (`All fields are required`)
        }

        if(req.body.password != req.body.repass){
            throw new Error (`Passwords don\`t match`)
        }

        const token = await register(req.body.username, req.body.password, req.body.address)
    //TODO check for session creating task
        res.cookie(`token`, token)
        res.redirect(`/auth/register`)
        
    } catch (error) {
        const errors = parseError(error)
        //TODO Add actual error handling from assignment
        res.render(`register`, {
            title: `Register page`,
            errors,
            body: {
                username: req.body.username
            }
        })
    }

})

authController.get(`/login`, isGuest() ,(req,res) => {
    res.render(`login`, {
        title: `Login page`
    })
})

authController.post(`/login`, async (req,res) => {
    try {
      const token =  await login(req.body.username, req.body.password)
        
      res.cookie(`token`, token)
      res.redirect(`/`) //TODO replace redirect by assignment
    } catch (error) {
        const errors = parseError(error)
    
        res.render(`login`, {
            title: `Login page`,
            errors,
            body: {
                username: req.body.username
            }
        })
    }
})

authController.get(`/logout`, (req,res) => {
    res.clearCookie(`token`)
    res.redirect(`/`)
})
module.exports = authController