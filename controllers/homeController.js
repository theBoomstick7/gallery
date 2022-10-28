const { getAll } = require("../services/publicationService")

const homeController = require(`express`).Router()

homeController.get (`/`, async (req,res) => {
    const publications = await getAll()

        res.render(`home` , {
            title: `Home Page`,
            publications
        })
})

module.exports = homeController