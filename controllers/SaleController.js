import Sale from '../models/Sale.js'
import js2xmlparser from 'js2xmlparser'
import Product from '../models/Product.js'
import SaleHasProduct from '../models/SaleHasProduct.js'
import Client from '../models/Client.js'
import Employee from '../models/Employee.js'

export default class ProductController {
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
        try {
            const sale = await Sale.create({
                payment_method: paymentmethod,
                installment,
                total_value: totalvalue,
                ClientId: clientid,
                employeeId: employeeid
            })
            let totalValue = 0
            products.map(async(product) => {
                const productSold = await Product.findOne({
                    where: { id: product.id }
                })

                await sale.setProducts(productSold, { through: { started: false } })
                if (productSold) {
                    totalValue += productSold.price * product.quantity
                }
                const quantity = {
                    product_quantity: product.quantity
                }
                await SaleHasProduct.update(quantity, {
                    where: { productId: product.id, saleId: sale.id }
                })
                await sale.update({
                    total_value: totalValue
                }, { where: { saleId: sale.id } })
            })
            if (
                req.headers['response-type'] === 'json' ||
                req.headers['response-type'] === undefined
            ) {
                res.status(200).json({ sale })
            } else if (req.headers['response-type'] == 'xml') {
                res.header('Content-Type', 'application/xml')
                res.send(js2xmlparser.parse('sale', sale))
            }
        } catch (error) {
            if (
                req.headers['response-type'] === 'json' ||
                req.headers['response-type'] === undefined
            ) {
                res.status(500).json({ error })
            } else if (req.headers['response-type'] === 'xml') {
                res.header('Content-Type', 'application/xml')
                res.send(js2xmlparser.parse('error', error))
            }
        }
    }
    static async getAllSales(req, res) {
        try {
            const sales = await Sale.findAll({
                include: [Client, Employee, Product]
                    //raw: true
            })
            if (
                req.headers['response-type'] === 'json' ||
                req.headers['response-type'] === undefined
            ) {
                res.status(200).json({ sales })
            } else if (req.headers['response-type'] == 'xml') {
                res.header('Content-Type', 'application/xml')
                res.send(js2xmlparser.parse('sales', sales))
            }
        } catch (error) {
            if (
                req.headers['response-type'] === 'json' ||
                req.headers['response-type'] === undefined
            ) {
                res.status(500).json({ error })
            } else if (req.headers['response-type'] === 'xml') {
                res.header('Content-Type', 'application/xml')
                res.send(js2xmlparser.parse('error', error))
            }
        }
    }
    static async getSale(req, res) {}
    static async updateSale(req, res) {}
}