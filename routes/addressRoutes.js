import { Router } from 'express'
import AddressControler from '../controllers/AddressControler.js'

const addressRoutes = Router()

addressRoutes.post('/create', AddressControler.createAddress)
addressRoutes.get('/', AddressControler.getAllAddress)
addressRoutes.get('/:id', AddressControler.getAddress)
addressRoutes.patch('/', AddressControler.updateAddress)
addressRoutes.delete('/', AddressControler.deleteAddress)

export default addressRoutes