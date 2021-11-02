const { Garden } = require('../models')

module.exports = {
    // get all garden
    async index(req, res) {
        try {
            const gardens = await Garden.findAll()
            res.send(gardens)
        } catch (err) {
            res.status(500).send({
                error: 'The gardens information was incorrect'
            })
        }
    },

    // create gardens
    async create(req, res) {
        try {
            const garden = await Garden.create(req.body)
            res.send(garden.toJSON())
        } catch (err) {
            res.status(500).send({
                error: 'Create gardens incorrect'
            })
        }
    },

    // edit garden, suspend, active
    async put(req, res) {
        try {
            await Garden.update(req.body, {
                where: {
                    id: req.params.gardenId
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                error: 'Update garden incorrect'
            })
        }
    },

    // delete garden
    async remove(req, res) {
        try {
            const garden = await Garden.findOne({
                where: {
                    id: req.params.gardenId
                }
            })

            if (!garden) {
                return res.status(403).send({
                    error: 'The garden information was incorrect'
                })
            }

            await garden.destroy()
            res.send(garden)
        } catch (err) {
            res.status(500).send({
                error: 'The garden information was incorrect'
            })
        }
    },

    // get garden by id
    async show (req, res) {
        try {
            const garden = await Garden.findByPk(req.params.gardenId)
            res.send(garden)
        } catch (err) {
            res.status(500).send({
                error: 'The garden information was incorrect'
            })
        }
    },
}
