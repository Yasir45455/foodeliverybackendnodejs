

const categoryModel = require("../models/category");
const subCategoryModal = require("../models/subCategory");
require('dotenv').config();
const { validationResult } = require("express-validator");
var mongoose = require('mongoose');

async function addCategory(req, res) {

  

    try {
        const { name } = req.body;
        const newCat = new categoryModel({
            name: name
        })
        await newCat.save();
        res.status(201).send('Category Added successfully');
    } catch (err) {
        res.status(500).send(err.message || 'Server error');
    }
}

async function addSubCategory(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
       
        const { name, cat } = req.body;

        let id = new mongoose.Types.ObjectId(cat)
        const category = await categoryModel.findOne({ _id: id });
        const newCat = new subCategoryModal({
            name: name,
            category: category.name
        })
        await newCat.save();
        res.status(201).send('SubCategory Added successfully');
    } catch (err) {
        res.status(500).send(err.message || 'Server error');
    }
}

async function getCategory(req, res) {
    try {
        const cats = await categoryModel.find({});
        const subCats = await subCategoryModal.find({});

        let data = { cats: cats, subCats: {} };

        for (let i = 0; i < cats.length; i++) {
            data.subCats[cats[i].name] = [];
        }

        for (let i = 0; i < subCats.length; i++) {
            if (data.subCats[subCats[i].category]) {
                data.subCats[subCats[i].category].push(subCats[i]);
            }
        }

        res.send(data);
    } catch (err) {
        res.status(500).send(err.message || 'Server error');
    }
}


module.exports = {
    addCategory,
    addSubCategory,
    getCategory
};
