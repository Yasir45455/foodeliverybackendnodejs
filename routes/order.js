const express = require('express');
const authMiddleware = require('../middleWares/auth');
const orderController = require('../controllers/orderController');
const router = express.Router();



// router.post('/create-order', authMiddleware.authenticateToken, orderValidator.validateOrderDetails  , orderController.createOrder);
router.post('/create-order', orderController.createOrder);
router.get('/get-order/:order_id',  orderController.getOrder);
router.get('/get-orders-list', orderController.getOrdersList);

module.exports = router;
