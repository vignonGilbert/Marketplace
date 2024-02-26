import express from 'express'
 import userCtrl from '../controllers/product.controller.js' 
 const router = express.Router()
 router.route('/api/product').post(userCtrl.create)
 router.route('/api/product').get(userCtrl.list)
 router.param('productId', userCtrl.userByID)
 router.route('/api/product/:productId').get(userCtrl.read)
 router.route('/api/product/:productId').put(userCtrl.update)
 router.route('/api/product/').delete(userCtrl.removeAll)
 router.route('/api/product/:productId').delete(userCtrl.remove)
 router.route('/api/product').get(userCtrl.findbyName)
 export default router
