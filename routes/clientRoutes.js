import { Router } from 'express'
import ClientController from '../controllers/ClientController.js'

const clientRoutes = Router()

clientRoutes.post('/create', ClientController.createClient)
clientRoutes.get('/', ClientController.getAllClient)
clientRoutes.get('/:id', ClientController.getClient)
clientRoutes.patch('/', ClientController.updateClient)
clientRoutes.delete('/', ClientController.deleteClient)

export default clientRoutes