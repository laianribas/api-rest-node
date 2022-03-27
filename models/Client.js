import { DataTypes } from 'sequelize'
import connection from '../db/connection.js'
import Address from './Address.js'
import ClientHasAddress from './ClientHasAddress.js'
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

Client.belongsToMany(Address, { through: ClientHasAddress })
Address.belongsToMany(Client, { through: ClientHasAddress })

Client.hasMany(ClientHasAddress)
ClientHasAddress.belongsTo(Client)
Address.hasMany(ClientHasAddress)
ClientHasAddress.belongsTo(Address)

Client.hasMany(Sale)
Sale.belongsTo(Client)

export default Client