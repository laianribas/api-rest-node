import connection from '../db/connection.js'
import Product from './Product.js'
import Sale from './Sale.js'

const SaleHasProduct = connection.define('sales_has_product')

Product.belongsToMany(Sale, { through: SaleHasProduct })
Sale.belongsToMany(Product, { through: SaleHasProduct })

export default SaleHasProduct