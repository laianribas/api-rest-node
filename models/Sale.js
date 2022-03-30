import { DataTypes } from 'sequelize'
import connection from '../db/connection.js'

const Sale = connection.define('sale', {
    payment_method: {
        type: DataTypes.STRING,
        allowNull: false
    },
    installment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    total_value: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
})

export default Sale