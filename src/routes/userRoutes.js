const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const validateBody = require('../middleware/validateBody')
const {userSchema, userUpdateSchema } = require('../validators/userValidator')

router.get('/user', (req, res) =>
  UserController.getInstance().getList(req, res)
)
router.get('/user/:id', (req, res) =>
  UserController.getInstance().getOne(req, res)
)
router.post('/user', validateBody(userSchema), (req, res) => UserController.getInstance().post(req, res))
router.put('/user', validateBody(userUpdateSchema), (req, res) => UserController.getInstance().put(req, res))
router.delete('/user', (req, res) =>
  UserController.getInstance().delete(req, res)
)

module.exports = router