import connection from '../db/connection.js'
import Address from './Address.js'
import Client from './Client.js'

const ClientHasAddress = connection.define('client_has_address')

Client.belongsToMany(Address, { through: ClientHasAddress })
Address.belongsToMany(Client, { through: ClientHasAddress })

export default ClientHasAddress