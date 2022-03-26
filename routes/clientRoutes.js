import { Router } from 'express'
import ClientController from '../controllers/ClientController.js'

const clientRoutes = Router()

clientRoutes.post('/create', ClientController.createClient)

export default clientRoutes