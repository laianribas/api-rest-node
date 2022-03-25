import { Sequelize } from 'sequelize'
import 'dotenv/config'

const connection = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS, {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    }
)

try {
    connection.authenticate()
    console.log('Authentication successful')
} catch (error) {
    console.log('Não foi possível conectar: ' + error)
}

export default connection