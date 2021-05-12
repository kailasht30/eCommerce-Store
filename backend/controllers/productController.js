import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

// @desc Fetch all Products
// @route Get /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};
  const products = await Product.find({ ...keyword });
  res.json(products);
});

// @desc Fetch Single Product by id
// @route Get /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    console.log('user id ::' + req.user._id);
    console.log('product user id ::' + product.user._id);
    if (req.user._id.equals(product.user._id)) {
      console.log('Inside If block');
      await product.remove();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404);
      throw new Error('Product not found in your listing');
    }
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export { getProducts, getProductById, deleteProduct };
