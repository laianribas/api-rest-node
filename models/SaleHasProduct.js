import { DataTypes } from 'sequelize'
import connection from '../db/connection.js'

const SaleHasProduct = connection.define('sales_has_product', {
    product_quantity: {
        type: DataTypes.INTEGER
    }
})

export default SaleHasProduct