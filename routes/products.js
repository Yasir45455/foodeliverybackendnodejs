const express = require('express');
const multer = require('multer');
const productController = require('../controllers/productController');

const router = express.Router();

// Multer Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  });
  
  const upload = multer({ storage });

// router.post('/', upload.single('image'), productController.createProduct);
router.post('/', productController.createProduct);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.put('/:id',  productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
