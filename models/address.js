const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    user_id: {
        type: String,
    },
    guest_id: { type: String, required: true, unique: true },

    house_no: {
        type: String,
    },
    street: {
        type: String,
    },
    city: {
        type: String,
    },
    postcode: {
        type: String,
    },
    instructions: {
        type: String,
    },
    appartment_name: {
        type: String,
    },
    floor: {
        type: String,
    },
    building_name: {
        type: String,
    },
    entry_code: {
        type: String,
    },
    business_name: {
        type: String,
    },
    hotel_name: {
        type: String,
    },
    business: {
        type: String,
    }
}, {
    timestamps: true
});

const AddressModel = mongoose.model("Address", addressSchema);

module.exports = AddressModel;
