const express=require('express')
const jwtAuthenticationMiddleware = require('../middleware/jwtAuthentication')
const router =express.Router()
const validateBody = require('../middleware/validateBody')
const OrderController=require('../controllers/OrderController')
const {orderSchema} =require('../validators/orderValidator') 

router.get('/order',jwtAuthenticationMiddleware,(req,res) =>OrderController.getInstance().getList(req,res))
router.get('/order/:id', jwtAuthenticationMiddleware,(req,res)=>OrderController.getInstance().getOne(req,res))
router.post('/order',validateBody(orderSchema),jwtAuthenticationMiddleware,(req,res)=>OrderController.getInstance().post(req,res))
router.put ('/order/:id',validateBody(orderSchema),jwtAuthenticationMiddleware,(req,res)=>OrderController.getInstance().put(req,res))
router.delete('/order/:id',jwtAuthenticationMiddleware,(req,res)=>OrderController.getInstance().delete(req,res))

module.exports=router