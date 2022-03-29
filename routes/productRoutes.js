import { Router } from 'express'
import ProductController from '../controllers/ProductController.js'

const productRoutes = Router()

productRoutes.post('/create', ProductController.createProduct)
productRoutes.get('/', ProductController.getAllProducts)
productRoutes.get('/:id', ProductController.getProduct)
productRoutes.patch('/', ProductController.updateProduct)
productRoutes.delete('/', ProductController.deleteProduct)

export default productRoutes