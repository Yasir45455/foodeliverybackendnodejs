const express = require("express");
require("./dbConnect/db");
const path = require("path");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

/*-------------------------------------ROUTES--------------------------------------------*/ 
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const addressRoutes = require('./routes/adress');
const promotionRoutes = require('./routes/promotions');
const promoImagesRoute = require('./routes/promoImages');

const app = express();

// CORS setup for multiple origins
const allowedOrigins = [
  "http://localhost:3000",
  "https://wasif-ali47.github.io/foodiefly" // add more origins if needed
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like mobile apps, curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

const port = process.env.PORT || 3001;
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Parse application/json
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome Brother');
});

// API routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/category', categoryRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);
app.use('/address', addressRoutes);
app.use('/promotions', promotionRoutes);
app.use('/promoimages', promoImagesRoute);

// --------------------- Swagger Setup ---------------------
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;

// Start server if this is the main file
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Swagger docs available at http://localhost:${port}/api/docs`);
  });
}
