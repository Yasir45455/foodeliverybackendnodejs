const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    // user_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    guestId: { type: String, required: true, unique: true },
    products: [
        {
            product_ID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ]
});

const cartModel = mongoose.model('Cart', cartSchema);

module.exports = cartModel;