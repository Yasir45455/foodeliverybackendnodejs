const AddressModel = require('../models/address');
const OrderModel = require('../models/orders');
const CartModel = require('../models/cart');
const ProductModel = require('../models/products');

require('dotenv').config();
const { validationResult } = require("express-validator");
var mongoose = require('mongoose');
const createOrder = async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }

    const { address_id, products, total_with_tip } = req.body;
    // const user_id = req.user.userId;
    console.log(products)
    try {
        // Verify if the address exists and belongs to the user
        // const address = await AddressModel.findOne({ _id: address_id, user_id });
        // if (!address) {
        //     return res.status(404).json({ error: 'Address not found or does not belong to the user' });
        // }

        // Calculate the total price
        const productPrices = await Promise.all(products.map(async product => {
            const productData = await ProductModel.findById(product.product_ID);
            if (!productData) {
                throw new Error(`Product not found: ${product.product_ID}`);
            }
            return productData.price * product.quantity;
        }));
        const price = productPrices.reduce((acc, curr) => acc + curr, 0);
        console.log(productPrices)

        // Create the order
        const newOrder = new OrderModel({
            // user_id,
            address_id,
            total_with_tip,
            price,
            products,
            
        });

        const savedOrder = await newOrder.save();

        // let cart = await CartModel.findOne();

        // cart.products = cart.products.filter(cartProduct =>
        //     !products.some(orderProduct =>
        //         orderProduct.product_ID.toString() === cartProduct.product_ID.toString()
        //     )
        // );

        // await cart.save();


        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getOrder = async (req, res) => {
    // const user_id = req.user.userId;
    const order_id = req.params.order_id;

    try {
        const order = await OrderModel.findOne({ _id: order_id })
            .populate({
                path: 'products.product_ID',
                model: 'Products',
                select: 'name price description' // select fields you want from product
            })
            .populate({
                path: 'address_id',
                model: 'Address',
                select: 'country province city postal_code phone'
            });

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// New function to get the list of all orders
const getOrdersList = async (req, res) => {
    // const user_id = req.user.userId;

    try {
        const orders = await OrderModel.find()
            .populate({
                path: 'products.product_ID',
                model: 'Products',
                select: 'name price description'
            })
            .populate({
                path: 'address_id',
                model: 'Address',
                select: 'country province address city postal_code phone first_name last_name'
            });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ error: 'No orders found' });
        }

        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createOrder,
    getOrder,
    getOrdersList,
};
