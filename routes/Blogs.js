const express = require('express');
const { createBlog, fetchAllBlogs , fetchBlogsByCategory} = require('../controller/Blog');

const router = express.Router();
router.post('/', createBlog)
      .get('/', fetchAllBlogs)
      // .get('/', fetchBlogsByCategory)
      

exports.router = router;
