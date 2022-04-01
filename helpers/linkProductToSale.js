import Product from '../models/Product.js'
import SaleHasProduct from '../models/SaleHasProduct.js'

export default async function linkProductToSale(products, sale) {
    let totalValue = 0
    await products.map(async(product) => {
        const productSold = await Product.findOne({
            where: { id: product.id }
        })
        await sale.setProducts(productSold, {
            through: { started: false }
        })
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
}