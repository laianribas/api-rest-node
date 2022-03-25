import { Sequelize } from 'sequelize'

const connection = new Sequelize('market2', 'root', '5121056', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    connection.authenticate()
    console.log('Authentication successful')
} catch (error) {
    console.log('Não foi possível conectar: ' + error)
}

export default connection