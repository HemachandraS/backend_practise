const express = require("express")
const Country = require("../models/countries.model")
const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const country = await Country.find().lean().exec()
        return res.status(200).send(country)
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
})
router.post("/", async (req, res) => {
    try {
        const country = await Country.create(req.body)
        return res.status(200).send(country)
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
})
router.patch("/:id", async (req, res) => {
    try {
        const country = await Country.findByIdAndUpdate(req.params.id,req.body,{new:true})
        return res.status(200).send(country)
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
})
router.delete("/:id", async (req, res) => {
    try {
        const country = await Country.findByIdAndDelete(req.params.id)
        return res.status(200).send(country)
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
})

module.exports=router