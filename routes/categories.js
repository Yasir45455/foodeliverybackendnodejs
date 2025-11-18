const express = require('express');
const categoriesController = require('../controllers/categoriesController');
const authMiddleware = require('../middleWares/auth');
const UserModel = require('../models/user');

const router = express.Router();

router.post('/', categoriesController.addCategory);
router.post('/add-sub-category', categoriesController.addSubCategory);
router.get('/', categoriesController.getCategory);

module.exports = router;