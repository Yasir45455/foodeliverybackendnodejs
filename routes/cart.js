const express = require('express');
const cartController = require('../controllers/cartController');
const router = express.Router();



router.post('/add-Product-to-cart', cartController.addProductToCart);
router.get('/get-cart/:guestId', cartController.getCart);
router.delete('/remove-product-from-cart/:product_id', cartController.removeFromCart);

module.exports = router;
