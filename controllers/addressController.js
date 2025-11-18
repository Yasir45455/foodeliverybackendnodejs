

const addressModel = require("../models/address");
require('dotenv').config();
const { validationResult } = require("express-validator");
var mongoose = require('mongoose');
const authController = require('../controllers/auth');
const userModel = require("../models/user");

async function addAddress(req, res) {

    const {guest_id, email, house_no, street, city, postcode, instructions, appartment_name, floor, building_name, entry_code, business_name, hotel_name, business } = req.body;



    

    console.log(req.body)
    try {
        const user = new userModel({
            name: email,
            email: email,
            password: email,
            role: 'user',
        });

        await user.save();

        const savedUserId = user._id;
        const newAddress = new addressModel({
            user_id: savedUserId,
            guest_id:guest_id,
            house_no: house_no,
            street: street,
            city: city,
            postcode: postcode,
            instructions: instructions,
            appartment_name: appartment_name,
            floor: floor,
            building_name: building_name,
            entry_code: entry_code,
            business_name: business_name,
            hotel_name: hotel_name,
            business: business
        });
        const savedAddress = await newAddress.save();
        res.status(201).json(savedAddress);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getAddress(req, res) {
    try {
        const { user_id } = req.params;
        const addresses = await addressModel.find({ user_id });
        res.status(200).json(addresses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getAddressByGuestId(req, res) {
    try {
        const { guest_id } = req.params;
        const addresses = await addressModel.find({ guest_id });
        res.status(200).json(addresses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



module.exports = {
    addAddress,
    getAddress,
    getAddressByGuestId
};
