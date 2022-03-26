import Address from '../models/Address.js'

export default class AddressControler {
    static async createAddress(req, res) {
        const { number, street, district, city, state, country, zipcode } = req.body
        if (!number) {
            return res
                .status(422)
                .json({ message: 'O número do endereço deve ser preenchido!' })
        }
        if (!street) {
            return res
                .status(422)
                .json({ message: 'A rua do endereço deve ser preenchida!' })
        }
        if (!district) {
            return res
                .status(422)
                .json({ message: 'O bairro do endereço deve ser preenchido!' })
        }
        if (!city) {
            return res
                .status(422)
                .json({ message: 'A cidade do endereço deve ser preenchida!' })
        }
        if (!state) {
            return res
                .status(422)
                .json({ message: 'O estado do endereço deve ser preenchido!' })
        }
        if (!country) {
            return res
                .status(422)
                .json({ message: 'O país do endereço deve ser preenchido!' })
        }
        if (!zipcode) {
            return res
                .status(422)
                .json({ message: 'O CEP do endereço deve ser preenchido!' })
        }

        const AddressExists = await Address.findOne({
            where: { number, street, district, city, country, zipcode }
        })
        if (AddressExists) {
            return res.status(422).json({ message: 'Endereço já está cadastrado!' })
        }
        try {
            const addressData = await Address.create({
                number,
                street,
                district,
                city,
                state,
                country,
                zipcode
            })
            res.status(200).json(addressData)
        } catch (error) {
            return res.status(500).json({ error: error })
        }
    }

    static async getAllAddress(req, res) {
        try {
            const adresses = await Address.findAll()
            res.status(200).json({ adresses })
        } catch (error) {
            return res.status(500).json({ error: error })
        }
    }
    static async getAddress(req, res) {
        const id = req.params.id
        try {
            const address = await Address.findOne({ where: { id: id } })
            if (!address) {
                return res.status(422).json({ message: 'Endereço não encontrado' })
            }
            res.status(200).json({ address })
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
    static async updateAddress(req, res) {
        const { id } = req.body

        try {
            const address = {
                number: req.body.number,
                street: req.body.street,
                district: req.body.district,
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
                zipcode: req.body.zipcode
            }
            const addressUpdated = await Address.update(address, {
                where: { id: id }
            })
            res.status(200).json({ addressUpdated })
        } catch (error) {
            return res.status(500).json({ error: error })
        }
    }
    static async deleteAddress(req, res) {
        const { id } = req.body
        try {
            const addressDeleted = await Address.destroy({ where: { id: id } })
            res.status(200).json({ addressDeleted })
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
}