const express = require('express')
const {createUser,allUsers,singleUser} = require('../controllers/userController')

const router = express.Router();


router.get('/all', allUsers)
router.get('/:id', singleUser)


router.post('/create-user', createUser)

module.exports = router