const Products = require('../models/products');

exports.createProduct = (productData) => Products.create(productData);
exports.getProducts = () => Products.find().populate('category');
exports.getProductById = (id) => Products.findById(id).populate('category');
exports.updateProduct = (id, updateData) => Products.findByIdAndUpdate(id, updateData, { new: true });
exports.deleteProduct = (id) => Products.findByIdAndDelete(id);