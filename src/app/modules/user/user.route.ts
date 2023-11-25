import express from 'express'
import { userController } from './user.controller'

const router = express.Router()

router.post('/',userController.createUser)
router.get('/',userController.getAllUser)
router.get('/:userId',userController.getSingleUser)
router.put('/:userId',userController.updateUser)
router.delete('/:userId',userController.deleteUser)
// Orders routes
router.put('/:userId/orders',userController.addNewProduct)
router.get('/:userId/orders',userController.singleUserAllOrders)
router.get('/:userId/total-price',userController.totalPriceOfOrders)

export default router;