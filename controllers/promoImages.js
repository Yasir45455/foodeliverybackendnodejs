const promoImageModel = require("../models/promoImages"); // Import the promo images model

// Function to handle adding promo images
async function addPromoImages(req, res) {
    // Check if files are present in the request
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No promo images provided" });
    }

    // Extract the file paths
    const promoImages = req.files.map(file => file.path); // Map the file paths

    try {
        const newPromoImage = new promoImageModel({
            PromoImages: promoImages, // Store the array of file paths
        });

        const PromoImagesList = await newPromoImage.save(); // Save to DB

        res.status(201).json(PromoImagesList); // Send saved images in response
         
    } catch (err) {
        res.status(500).json({ error: err.message }); // Handle any errors
    }
}

// Function to handle updating promo images
async function updatePromoImages(req, res) {
    const { id } = req.params; // Extract the ID from request parameters

    // Check if files are present in the request
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No promo images provided for update" });
    }

    // Extract the file paths
    const updatedPromoImages = req.files.map(file => file.path); // Map the new file paths

    try {
        // Find the existing promo images by ID and update them
        const updatedPromoImageDoc = await promoImageModel.findByIdAndUpdate(
            id,
            { PromoImages: updatedPromoImages }, // Update the PromoImages array
            { new: true, runValidators: true } // Return the updated document and validate
        );

        // If no document is found, return a 404 error
        if (!updatedPromoImageDoc) {
            return res.status(404).json({ error: "Promo images not found" });
        }

        // Respond with the updated promo images
        res.status(200).json({
            message: "Promo images updated successfully",
            updatedPromoImages: updatedPromoImageDoc
        });

    } catch (err) {
        // Log the error for debugging purposes
        console.error("Error updating promo images:", err);

        // Respond with a 500 status and error message
        res.status(500).json({ error: "Failed to update promo images" });
    }
}




// Function to handle fetching promo images
async function getPromoImages(req, res) {
    try {
        // Retrieve all promo images from the database
        const promoImagesList = await promoImageModel.find();

        // Check if any promo images exist
        if (promoImagesList.length === 0) {
            return res.status(404).json({ message: "No promo images found" });
        }

        // Respond with the list of promo images
        res.status(200).json({
            message: "Promo images retrieved successfully",
            promoImages: promoImagesList
        });
    } catch (err) {
        // Log the error for debugging purposes
        console.error("Error fetching promo images:", err);

        // Respond with a 500 status and error message
        res.status(500).json({ error: "Failed to fetch promo images" });
    }
}

module.exports = { updatePromoImages, addPromoImages, getPromoImages };
