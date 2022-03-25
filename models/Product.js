import { DataTypes } from 'sequelize'
import connection from '../db/connection.js'

const Product = connection.define('product', {
    product_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    },
    technical_information: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default Product