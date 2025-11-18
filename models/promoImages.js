const mongoose = require('mongoose');

const promoImage = new mongoose.Schema({
   
    PromoImages: {
        type: [String],
        required: true
    },
   
});

const promoImageModel = mongoose.model('PromoImages', promoImage);

module.exports = promoImageModel;
