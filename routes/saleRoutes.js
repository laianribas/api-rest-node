import { Router } from 'express'
import SaleController from '../controllers/SaleController.js'

const saleRoutes = Router()

saleRoutes.post('/', SaleController.createSale)
saleRoutes.get('/', SaleController.getAllSales)
saleRoutes.get('/:id', SaleController.getSale)
saleRoutes.patch('/', SaleController.updateSale)

export default saleRoutes