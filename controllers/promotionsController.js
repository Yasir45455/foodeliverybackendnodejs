const Promotion = require('../models/promotions');  // Assuming the schema file is located in '../models/Promotion'
const Products = require('../models/products');  // Import Product model

// Create a new promotion
exports.createPromotion = async (req, res) => {
  try {
    const { SectionsList, Category, SubCategory, ProductsList } = req.body;

    // Fetch product data based on product IDs
    const products = await Products.find({ '_id': { $in: ProductsList } });

    // Create a new promotion document
    const promotion = new Promotion({
      SectionsList,
      Category,
      SubCategory,
      ProductsList: products // Add full product data here
    });

    // Save the promotion to the database
    await promotion.save();

    res.status(201).json({
      message: 'Promotion created successfully!',
      promotion
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Error creating promotion',
      error: err.message
    });
  }
};

// Get all promotions with populated products
exports.getAllPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.find()
      .populate('ProductsList');  // Populate the ProductsList field with the product data

    res.status(200).json({
      message: 'Promotions fetched successfully!',
      promotions
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Error fetching promotions',
      error: err.message
    });
  }
};

// Get a promotion by ID
exports.getPromotionById = async (req, res) => {
  try {
    const { promotionId } = req.params;
    
    const promotion = await Promotion.findById(promotionId)
      .populate('ProductsList');  // Populate the ProductsList field

    if (!promotion) {
      return res.status(404).json({
        message: 'Promotion not found'
      });
    }

    res.status(200).json({
      message: 'Promotion fetched successfully!',
      promotion
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Error fetching promotion',
      error: err.message
    });
  }
};

// Create a new promotion
exports.createPromotion = async (req, res) => {
  try {
    const { SectionsList, Category, SubCategory, ProductsList } = req.body;

    // Fetch product data based on product IDs
    const products = await Products.find({ '_id': { $in: ProductsList } });

    // Create a new promotion document
    const promotion = new Promotion({
      SectionsList,
      Category,
      SubCategory,
      ProductsList: products // Add full product data here
    });

    // Save the promotion to the database
    await promotion.save();

    res.status(201).json({
      message: 'Promotion created successfully!',
      promotion
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Error creating promotion',
      error: err.message
    });
  }
};

// Update a promotion by ID
exports.updatePromotion = async (req, res) => {
  try {
    const { promotionId } = req.params;
    const { SectionsList, Category, SubCategory, ProductsList } = req.body;

    // Fetch product data based on product IDs
    const products = await Products.find({ '_id': { $in: ProductsList } });

    const promotion = await Promotion.findByIdAndUpdate(
      promotionId,
      { SectionsList, Category, SubCategory, ProductsList: products },
      { new: true }
    );

    if (!promotion) {
      return res.status(404).json({
        message: 'Promotion not found'
      });
    }

    res.status(200).json({
      message: 'Promotion updated successfully!',
      promotion
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Error updating promotion',
      error: err.message
    });
  }
};

// Delete a promotion by ID
exports.deletePromotion = async (req, res) => {
  try {
    const { promotionId } = req.params;

    const promotion = await Promotion.findByIdAndDelete(promotionId);

    if (!promotion) {
      return res.status(404).json({
        message: 'Promotion not found'
      });
    }

    res.status(200).json({
      message: 'Promotion deleted successfully!'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Error deleting promotion',
      error: err.message
    });
  }
};

