import { DataTypes } from 'sequelize'
import connection from '../db/connection.js'
import Sale from './Sale.js'

const Employee = connection.define('employee', {
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

Employee.hasMany(Sale)
Sale.belongsTo(Employee)

export default Employee