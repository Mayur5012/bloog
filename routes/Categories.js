const express = require('express');
const { fetchCategories } = require('../controller/Category');

const router = express.Router();
//  /categories is already added in base path
router.get('/', fetchCategories)

exports.router = router;
