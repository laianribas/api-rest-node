import Product from '../models/Product.js'

export default async function allProductsExists(products) {
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