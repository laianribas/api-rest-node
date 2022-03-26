import Client from '../models/Client.js'

export default class ClientController {
    static async createClient(req, res) {
        const { firstname, lastname, cpf, birthdate } = req.body
        if (!firstname) {
            return res
                .status(422)
                .json({ message: 'O nome do cliente deve ser preenchido!' })
        }
        if (!lastname) {
            return res
                .status(422)
                .json({ message: 'O sobrenome do cliente deve ser preenchido!' })
        }
        if (!cpf) {
            return res
                .status(422)
                .json({ message: 'O CPF do cliente deve ser preenchido!' })
        }
        if (!birthdate) {
            return res.status(422).json({
                message: 'A data de nascimento do cliente deve ser preenchida!'
            })
        }
        const clientExists = await Client.findOne({ where: { cpf: cpf } })
        if (clientExists) {
            return res.status(422).json({
                message: 'Cliente já cadastrado!'
            })
        }
        const client = await Client.create({
            first_name: firstname,
            last_name: lastname,
            cpf: cpf,
            birth_date: birthdate,
            active: true
        })
        try {
            res.status(200).json({ client })
        } catch (error) {
            res.status(500).json({ error })
        }
    }
    static async getAllClient(req, res) {
        try {
            const clients = await Client.findAll()
            res.status(200).json({ clients })
        } catch (error) {
            res.status(500).json({ error })
        }
    }
    static async getClient(req, res) {
        const { id } = req.params
        try {
            const client = await Client.findOne({ where: { id: id } })
            if (!client) {
                return res.status(422).json({ message: 'Endereço não encontrado' })
            }
            res.status(200).json({ client })
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
    static async updateClient(req, res) {
        const { id } = req.body

        try {
            const client = {
                first_name: req.body.firstname,
                last_name: req.body.lastname,
                cpf: req.body.cpf,
                birth_date: req.body.birthdate
            }
            const clientUpdated = await Client.update(client, { where: { id: id } })
            res.status(200).json({ clientUpdated })
        } catch (error) {
            res.status(500).json({ error })
        }
    }

    static async deleteClient(req, res) {
        const { id } = req.body
        const client = {
            active: false
        }
        try {
            const clientDeleted = await Client.update(client, { where: { id: id } })
            res.status(200).json({ clientDeleted })
        } catch (error) {
            res.status(500).json({ error })
        }
    }
}