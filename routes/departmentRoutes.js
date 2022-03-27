import { Router } from 'express'
import DepartmentController from '../controllers/DepartmentController.js'

const departmentRoutes = Router()

departmentRoutes.post('/create', DepartmentController.createDepartment)
departmentRoutes.get('/', DepartmentController.getAllDepartments)
departmentRoutes.get('/:id', DepartmentController.getDepartment)
departmentRoutes.patch('/', DepartmentController.updateDepartment)
departmentRoutes.delete('/', DepartmentController.deleteDepartment)

export default departmentRoutes