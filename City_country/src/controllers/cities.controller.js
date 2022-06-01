const express = require("express")
const City = require("../models/cities.model")

const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const city = await City.find().populate({path:"countryId",select:{}}).lean().exec()
        return res.status(200).send(city)
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
})
router.post("/", async (req, res) => {
    try {
        const city = await City.create(req.body)
        return res.status(200).send(city)
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
})
router.patch("/:id", async (req, res) => {
    try {
        const city = await City.findByIdAndUpdate(req.params.id,req.body,{new:true})
        return res.status(200).send(city)
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
})
router.delete("/:id", async (req, res) => {
    try {
        const city = await City.findByIdAndDelete(req.params.id)
        return res.status(200).send(city)
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
})

module.exports=router
