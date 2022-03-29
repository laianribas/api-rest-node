import { Router } from 'express'
import EmployeeController from '../controllers/EmployeeController.js'

const employeeRoutes = Router()

employeeRoutes.post('/create', EmployeeController.createEmployee)
employeeRoutes.get('/', EmployeeController.getAllEmployees)
employeeRoutes.get('/:id', EmployeeController.getEmployee)
employeeRoutes.patch('/', EmployeeController.updateEmployee)
employeeRoutes.delete('/', EmployeeController.deleteEmployee)

export default employeeRoutes