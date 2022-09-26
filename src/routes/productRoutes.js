const express=require('express')
const jwtAuthenticationMiddleware = require('../middleware/jwtAuthentication')
const router =express.Router()
const validateBody = require('../middleware/validateBody')
const ProductController=require('../controllers/ProductController')
const {ProductSchema}=require('../validators/productValidator')

router.get('/product',jwtAuthenticationMiddleware,(req,res)=> ProductController.getInstance().getList(req,res))
router.get('/product/:id',jwtAuthenticationMiddleware,(req,res)=>ProductController.getInstance().getOne(req,res))
router.post('/product',validateBody(ProductSchema),jwtAuthenticationMiddleware,(req,res)=>ProductController.getInstance().post(req,res))
router.put('/product/:id',validateBody(ProductSchema),jwtAuthenticationMiddleware,(req,res)=>ProductController.getInstance().put(req,res))
router.delete('/product/:id',jwtAuthenticationMiddleware,(req,res)=>ProductController.getInstance().delete(req,res))

module.exports=router