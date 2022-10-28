const authController = require("../controllers/authController")
const galleryController = require("../controllers/galleryController")
const homeController = require("../controllers/homeController")
const notFoundController = require("../controllers/notFoundController")

module.exports = (app) => {
    app.use(`/`, homeController)
    app.use(`/auth`, authController)
    app.use(`/gallery`, galleryController)
    app.use(`*`, notFoundController)
}