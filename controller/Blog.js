
const { Blog } = require('../model/Blogs');

// to create a new blog
exports.createBlog = async (req, res) => {
  const { title, thumbnail, description, category,name, url } = req.body;

  // validation
  if (!title || !thumbnail || !description || !category || !thumbnail || !name || !url) {
    return res.status(400).json({ statusCode: 400, message: 'All fields are required' });
  }

  try {
    // create a new blog object
    const newBlog = new Blog({ title, thumbnail, description, category, url,name });
    const savedBlog = await newBlog.save();

    res.status(201).json({ statusCode: 201, data: savedBlog });
  } catch (error) {
    if (error.code === 11000) {
      // hnadle duplicate title error
      return res.status(409).json({ statusCode: 409, message: 'Blog title must be unique' });
    }
    res.status(500).json({ statusCode: 500, message: error.message });
  }
};

// to fetch all blogs
exports.fetchAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ deleted: false });
    res.status(200).json({ statusCode: 200, data: blogs });
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
};


