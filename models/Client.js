import { DataTypes } from 'sequelize'
import connection from '../db/connection.js'
import Sale from './Sale.js'

const Client = connection.define('Client', {
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birth_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN
    }
})

Client.hasMany(Sale)
Sale.belongsTo(Client)

export default Client