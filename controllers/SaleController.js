import Sale from '../models/Product.js'
import js2xmlparser from 'js2xmlparser'

export default class ProductController {
    static async createSale(req, res) {
        const { products } = req.body
        products.map((product) => {
            console.log(product)
        })
    }
    static async getAllSales(req, res) {}
    static async getSale(req, res) {}
    static async updateSale(req, res) {}
}