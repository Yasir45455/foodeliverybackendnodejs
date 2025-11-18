const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    // user_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    address_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    total_with_tip :
    {
        type:String,
    },
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
}, {
    timestamps: true
});

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;
