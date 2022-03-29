import { Router } from 'express'
import SaleController from '../controllers/SaleController.js'

const saleRoutes = Router()

saleRoutes.post('/create', SaleController.createSale)
saleRoutes.get('/', SaleController.getAllSales)
saleRoutes.get('/:id', SaleController.getSale)
saleRoutes.patch('/', SaleController.updateSale)
saleRoutes.delete('/', SaleController.deleteSale)

export default saleRoutes