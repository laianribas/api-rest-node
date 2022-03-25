import { DataTypes } from 'sequelize'
import connection from '../db/connection.js'
import Employee from './Employee.js'

const Department = connection.define('department', {
    department_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

Department.hasMany(Employee)
Employee.belongsTo(Department)

export default Department