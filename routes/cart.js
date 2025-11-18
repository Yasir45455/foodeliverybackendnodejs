const express = require('express');
const cartController = require('../controllers/cartController');
const router = express.Router();



router.get('/add-Prouct-to-cart/:product_id/:quantity', cartController.addProductToCart);
router.get('/get-cart/:guestId', cartController.getCart);
router.delete('/remove-product-from-cart/:product_id', cartController.removeFromCart);

module.exports = router;
