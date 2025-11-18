const cartModel = require("../models/cart");
require('dotenv').config();
const { validationResult } = require("express-validator");
var mongoose = require('mongoose');
const ProductModel = require("../models/products");
const { v4: uuidv4 } = require('uuid'); 



async function addProductToCart(req, res) {
    const { product_id, quantity } = req.params;

    const parsedQuantity = parseInt(quantity);
    if (!Number.isInteger(parsedQuantity) || parsedQuantity < 0) {
        return res.status(400).json({ error: 'Quantity must be a non-negative integer' });
    }

    try {
        const product = await ProductModel.findById(product_id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Get guestId from headers or create a new one
        let guestId = req.headers['guest-id'] || null;
        if (!guestId) {
            guestId = uuidv4(); // Generate unique guest ID
        }

        // Find cart for the guest user
        let cart = await cartModel.findOne({ guestId });

        if (!cart) {
            if (parsedQuantity === 0) {
                return res.status(400).json({ error: 'Cannot add zero quantity of a product to a new cart' });
            }
            cart = new cartModel({ guestId, products: [] });
        }

        // Check if product is already in the cart
        const productIndex = cart.products.findIndex(item => item.product_ID.toString() === product_id);

        if (productIndex > -1) {
            if (parsedQuantity === 0) {
                cart.products.splice(productIndex, 1); // Remove product if quantity is 0
            } else {
                cart.products[productIndex].quantity = parsedQuantity; // Update quantity
            }
        } else {
            if (parsedQuantity === 0) {
                return res.status(400).json({ error: 'Cannot add zero quantity of a product to the cart' });
            }
            cart.products.push({ product_ID: product_id, quantity: parsedQuantity });
        }

        const updatedCart = await cart.save();

        res.status(200).json({ cart: updatedCart, guestId }); // Return updated cart with guestId
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


async function getCart(req, res) {
    try {
        const { guestId } = req.params; // Extract guestId from params

        // Find the cart based on guestId and populate the product details
        const cart = await cartModel.findOne({ guestId }).populate({
            path: 'products.product_ID',
            model: 'Products',
            select: 'name description category subCategory height width weight sku images price'
        });

        // Check if the cart exists
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found for the specified guestId' });
        }

        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}



async function removeFromCart(req, res) {
    const { product_id } = req.params;

    try {
        // Verify that the product exists
        const product = await ProductModel.findById(product_id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Find the cart (assuming no user ID for now)
        let cart = await cartModel.findOne();
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        // Find the product in the cart
        const productIndex = cart.products.findIndex(item => item.product_ID.toString() === product_id);

        if (productIndex === -1) {
            return res.status(404).json({ error: 'Product not found in cart' });
        }

        // Remove the product from the cart
        cart.products.splice(productIndex, 1);

        // Save the updated cart
        const updatedCart = await cart.save();

        res.status(200).json(updatedCart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    addProductToCart,
    getCart,
    removeFromCart,
};
