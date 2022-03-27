import Address from '../models/Address.js'
import Client from '../models/Client.js'

export default class ClientController {
    static async createClient(req, res) {
        const { firstname, lastname, cpf, birthdate } = req.body
        const { number, street, district, city, state, country, zipcode } = req.body
        if (!firstname || firstname == '') {
            return res
                .status(422)
                .json({ message: 'O nome do cliente deve ser preenchido!' })
        }
        if (!lastname || lastname == '') {
            return res
                .status(422)
                .json({ message: 'O sobrenome do cliente deve ser preenchido!' })
        }
        if (!cpf || cpf == '') {
            return res
                .status(422)
                .json({ message: 'O CPF do cliente deve ser preenchido!' })
        }
        if (!birthdate || birthdate == '') {
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
        if (!number || number == '') {
            return res
                .status(422)
                .json({ message: 'O número do endereço deve ser preenchido!' })
        }
        if (!street || street == '') {
            return res
                .status(422)
                .json({ message: 'A rua do endereço deve ser preenchida!' })
        }
        if (!district || district == '') {
            return res
                .status(422)
                .json({ message: 'O bairro do endereço deve ser preenchido!' })
        }
        if (!city || city == '') {
            return res
                .status(422)
                .json({ message: 'A cidade do endereço deve ser preenchida!' })
        }
        if (!state || state == '') {
            return res
                .status(422)
                .json({ message: 'O estado do endereço deve ser preenchido!' })
        }
        if (!country || country == '') {
            return res
                .status(422)
                .json({ message: 'O país do endereço deve ser preenchido!' })
        }
        if (!zipcode || zipcode == '') {
            return res
                .status(422)
                .json({ message: 'O CEP do endereço deve ser preenchido!' })
        }
        try {
            const address = (await Address.findOne({
                    where: {
                        number,
                        street,
                        district,
                        city,
                        state,
                        country,
                        zipcode
                    }
                })) ?
                await Address.findOne({
                    where: {
                        number,
                        street,
                        district,
                        city,
                        state,
                        country,
                        zipcode
                    }
                }) :
                await Address.create({
                    number,
                    street,
                    district,
                    city,
                    state,
                    country,
                    zipcode
                })
            const client = await Client.create({
                first_name: firstname,
                last_name: lastname,
                cpf: cpf,
                birth_date: birthdate,
                active: true
            })
            await client.setAddresses(address, { through: { started: false } })
            res.status(200).json({ client })
        } catch (error) {
            res.status(500).json({ error: 'merda' + error })
        }
    }
    static async getAllClient(req, res) {
        try {
            const clients = await Client.findAll({ include: Address })
            res.status(200).json({ clients })
        } catch (error) {
            res.status(500).json({ error })
        }
    }
    static async getClient(req, res) {
        const { id } = req.params
        try {
            const client = await Client.findOne({ where: { id: id } })
                // if (!client) {
                //     return res.status(422).json({ message: 'Endereço não encontrado' })
                // }
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