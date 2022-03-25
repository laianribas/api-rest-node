import { DataTypes } from 'sequelize'
import connection from '../db/connection.js'

const Address = connection.define('Address', {
    number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false
    },
    district: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    zipcode: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default Address