const { Blog } = require('../model/Blogs');

exports.createBlog = async (req, res) => {
  const { title, thumbnail, description, category, name, url } = req.body;

  // basic validation for checking null inputs
  if (!title || !thumbnail || !description || !category || !name || !url) {
    return res.status(400).json({ statusCode: 400, message: 'All fields are required' });
  }

  // creting new Blog object and saving it to db
  try {
    const newBlog = new Blog({ title, thumbnail, description, category, url, name });
    const savedBlog = await newBlog.save();
    res.status(201).json({ statusCode: 201, data: savedBlog });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ statusCode: 409, message: 'Blog title must be unique' });
    }
    res.status(500).json({ statusCode: 500, message: error.message });
  }
};

exports.fetchAllBlogs = async (req, res) => {
  try {
    // fetching all blogs based on pagination and categories
    const { category, page = 1, pageSize = 8 } = req.query;
    const skip = (page - 1) * pageSize;

    let query = { deleted: false };
    if (category && category !== 'All') {
      query.category = category;
    }

    // using mongodb skip and limit for pagination functionality
    const totalItems = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .skip(skip)
      .limit(parseInt(pageSize))
      .sort({ _id: -1 });

    res.status(200).json({
      statusCode: 200,
      data: blogs,
      totalItems,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalItems / pageSize)
    });
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
};

exports.fetchCategories = async (req, res) => {
  try {
    const categories = await Blog.distinct('category');
    // by default there will be "All" category and addition database categories
    res.status(200).json({ statusCode: 200, data: ['All', ...categories] });
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
};