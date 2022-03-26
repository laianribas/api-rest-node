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
            birth_date: birthdate
        })
        res.status(200).json({ client })
    }
}