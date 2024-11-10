
const express = require('express');
const { createBlog, fetchAllBlogs, fetchCategories } = require('../controller/Blog');

const router = express.Router();

router
  .post('/', createBlog)
  .get('/', fetchAllBlogs)
  .get('/categories', fetchCategories);

exports.router = router;
