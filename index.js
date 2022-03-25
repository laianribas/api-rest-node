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

const port = 3000

const app = express()

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

//ROUTES

connection
    .sync({ force: true })
    .then(
        app.listen(port, () => {
            console.log('listening on port' + port)
        })
    )
    .catch((err) => {
        console.log(err)
    })