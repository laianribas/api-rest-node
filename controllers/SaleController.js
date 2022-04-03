import js2xmlparser from 'js2xmlparser'
import linkProductToSale from '../helpers/linkProductToSale.js'
import Client from '../models/Client.js'
import Employee from '../models/Employee.js'
import Product from '../models/Product.js'
import Sale from '../models/Sale.js'

export default class SaleController {
    static async createSale(req, res) {
        const {
            paymentmethod,
            installment,
            totalvalue,
            clientid,
            employeeid,
            products
        } = req.body
        if (!paymentmethod || paymentmethod == '') {
            if (
                req.headers['response-type'] === 'json' ||
                req.headers['response-type'] === undefined
            ) {
                return res.status(422).json({
                    message: 'O método de pagamento deve ser informado!'
                })
            } else if (req.headers['response-type'] === 'xml') {
                res.header('Content-Type', 'application/xml')
                return res.status(422).send(
                    js2xmlparser.parse('Error', {
                        message: 'O método de pagamento deve ser informado!'
                    })
                )
            }
        }
        if (!installment || installment == '') {
            if (
                req.headers['response-type'] === 'json' ||
                req.headers['response-type'] === undefined
            ) {
                return res.status(422).json({
                    message: 'A quantidade de parcelas deve ser informada!'
                })
            } else if (req.headers['response-type'] === 'xml') {
                res.header('Content-Type', 'application/xml')
                return res.status(422).send(
                    js2xmlparser.parse('Error', {
                        message: 'A quantidade de parcelas deve ser informada!'
                    })
                )
            }
        }
        if (!clientid || clientid == '') {
            if (
                req.headers['response-type'] === 'json' ||
                req.headers['response-type'] === undefined
            ) {
                return res.status(422).json({
                    message: 'O cliente deve ser informado!'
                })
            } else if (req.headers['response-type'] === 'xml') {
                res.header('Content-Type', 'application/xml')
                return res.status(422).send(
                    js2xmlparser.parse('Error', {
                        message: 'O cliente deve ser informado!'
                    })
                )
            }
        }
        if (!employeeid || employeeid == '') {
            if (
                req.headers['response-type'] === 'json' ||
                req.headers['response-type'] === undefined
            ) {
                return res.status(422).json({
                    message: 'O funcionário deve ser informado!'
                })
            } else if (req.headers['response-type'] === 'xml') {
                res.header('Content-Type', 'application/xml')
                return res.status(422).send(
                    js2xmlparser.parse('Error', {
                        message: 'O funcionário deve ser informado!'
                    })
                )
            }
        }
        if (!products || products.length == 0) {
            if (
                req.headers['response-type'] === 'json' ||
                req.headers['response-type'] === undefined
            ) {
                return res.status(422).json({
                    message: 'Os produtos da compra devem ser informados!'
                })
            } else if (req.headers['response-type'] === 'xml') {
                res.header('Content-Type', 'application/xml')
                return res.status(422).send(
                    js2xmlparser.parse('Error', {
                        message: 'Os produtos da compra devem ser informados!'
                    })
                )
            }
        }
        async function allProductsExists() {
            for (let i = 0; i < products.length; i++) {
                const product = await Product.findOne({
                    where: { id: products[i].id },
                    raw: true
                })
                if (!product) {
                    return false
                }
            }
            return true
        }
        if (!(await allProductsExists())) {
            if (
                req.headers['response-type'] === 'json' ||
                req.headers['response-type'] === undefined
            ) {
                return res.status(422).json({
                    message: 'Existe um produto não cadastrado!'
                })
            } else if (req.headers['response-type'] === 'xml') {
                res.header('Content-Type', 'application/xml')
                return res.status(422).send(
                    js2xmlparser.parse('Error', {
                        message: 'Existe um produto não cadastrado!'
                    })
                )
            }
        } else {
            try {
                const sale = await Sale.create({
                    payment_method: paymentmethod,
                    installment,
                    total_value: totalvalue,
                    ClientId: clientid,
                    employeeId: employeeid
                })
                await linkProductToSale(products, sale)
                if (
                    req.headers['response-type'] === 'json' ||
                    req.headers['response-type'] === undefined
                ) {
                    return res.status(200).json({ sale })
                } else if (req.headers['response-type'] == 'xml') {
                    res.header('Content-Type', 'application/xml')
                    return res.status(200).send(js2xmlparser.parse('sale', sale))
                }
            } catch (error) {
                if (
                    req.headers['response-type'] === 'json' ||
                    req.headers['response-type'] === undefined
                ) {
                    return res.status(500).json({ error })
                } else if (req.headers['response-type'] === 'xml') {
                    res.header('Content-Type', 'application/xml')
                    return res.status(500).send(js2xmlparser.parse('error', error))
                }
            }
        }
    }
    static async getAllSales(req, res) {
        try {
            const sales = await Sale.findAll({
                include: [Client, Employee, Product],
                raw: true
            })
            if (
                req.headers['response-type'] === 'json' ||
                req.headers['response-type'] === undefined
            ) {
                return res.status(200).json({ sales })
            } else if (req.headers['response-type'] == 'xml') {
                res.header('Content-Type', 'application/xml')
                return res.status(200).send(js2xmlparser.parse('sales', sales))
            }
        } catch (error) {
            if (
                req.headers['response-type'] === 'json' ||
                req.headers['response-type'] === undefined
            ) {
                return res.status(500).json({ error })
            } else if (req.headers['response-type'] === 'xml') {
                res.header('Content-Type', 'application/xml')
                return res.status(500).send(js2xmlparser.parse('error', error))
            }
        }
    }
    static async getSale(req, res) {
        const { id } = req.params
        try {
            const sale = await Sale.findOne({
                where: { id: id },
                include: [Client, Employee, Product],
                raw: true
            })
            if (!sale) {
                if (
                    req.headers['response-type'] === 'json' ||
                    req.headers['response-type'] === undefined
                ) {
                    return res.status(422).json({
                        message: 'Venda não encontrada!'
                    })
                } else if (req.headers['response-type'] === 'xml') {
                    res.header('Content-Type', 'application/xml')
                    return res.status(422).send(
                        js2xmlparser.parse('Error', {
                            message: 'Venda não encontrada!'
                        })
                    )
                }
            }
            if (
                req.headers['response-type'] === 'json' ||
                req.headers['response-type'] === undefined
            ) {
                return res.status(200).json({ sale })
            } else if (req.headers['response-type'] == 'xml') {
                res.header('Content-Type', 'application/xml')
                return res.status(200).send(js2xmlparser.parse('sale', sale))
            }
        } catch (error) {
            if (
                req.headers['response-type'] === 'json' ||
                req.headers['response-type'] === undefined
            ) {
                return res.status(500).json({ error })
            } else if (req.headers['response-type'] === 'xml') {
                res.header('Content-Type', 'application/xml')
                return res.status(500).send(js2xmlparser.parse('error', error))
            }
        }
    }
    static async updateSale(req, res) {
        const { id } = req.body
        try {
            const sale = {
                payment_method: req.body.paymentmethod,
                installment: req.body.installment,
                ClientId: req.body.clientid,
                employeeId: req.body.employeeid
            }
            const saleUpdated = await Sale.update(sale, { where: { id: id } })
            const saleWasUpdated = await Sale.findOne({
                where: { id: id },
                include: [Client, Employee, Product]
            })
            if (req.body.products && req.body.products.length > 0) {
                await saleWasUpdated.setProducts([])
                await linkProductToSale(req.body.products, saleWasUpdated)
            }

            if (
                req.headers['response-type'] === 'json' ||
                req.headers['response-type'] === undefined
            ) {
                return res.status(200).json({ saleUpdated })
            } else if (req.headers['response-type'] == 'xml') {
                res.header('Content-Type', 'application/xml')
                return res
                    .status(200)
                    .send(js2xmlparser.parse('saleUpdated', saleUpdated))
            }
        } catch (error) {
            if (
                req.headers['response-type'] === 'json' ||
                req.headers['response-type'] === undefined
            ) {
                return res.status(500).json({ error })
            } else if (req.headers['response-type'] === 'xml') {
                res.header('Content-Type', 'application/xml')
                return res.status(500).send(js2xmlparser.parse('error', error))
            }
        }
    }
}