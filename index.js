import express from 'express'

import connection from './db/connection.js'

import Client from './models/Client.js'
import Address from './models/Address.js'
import ClientHasAddress from './models/ClientHasAddress.js'
import Department from './models/Department.js'
import Employee from './models/Employee.js'
import Product from './models/Product.js'
import Sale from './models/Sale.js'
import SaleHasProduct from './models/SaleHasProduct.js'
import Section from './models/Section.js'

import addressRoutes from './routes/addressRoutes.js'
import clientRoutes from './routes/clientRoutes.js'
import departmentRoutes from './routes/departmentRoutes.js'

const port = 3000

const app = express()

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

//ROUTES
app.use('/address', addressRoutes)
app.use('/client', clientRoutes)
app.use('/department', departmentRoutes)

connection
// .sync({ force: true })
    .sync()
    .then(
        app.listen(port, () => {
            console.log('listening on port ' + port)
        })
    )
    .catch((err) => {
        console.log(err)
    })