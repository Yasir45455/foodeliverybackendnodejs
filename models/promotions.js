const mongoose = require('mongoose');
const Product = require('../models/products'); // Import the Product model

const promotionSchema = new mongoose.Schema({
  SectionsList: String,
  Category: String,
  SubCategory: String,
  ProductsList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products'  // Reference to the Product model
  }]
});

const Promotion = mongoose.model('Promotion', promotionSchema);

module.exports = Promotion;
