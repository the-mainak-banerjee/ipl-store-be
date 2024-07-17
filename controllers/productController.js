const Product = require('../models/productModel');
const ApiFeatures = require('../utils/apiFeatures');

exports.getAllProducts = async (req, res, next) => {
  try {
    const features = new ApiFeatures(Product.find(), req.query)
      .filter()
      .sort()
      .limit()
      .findByIds();

    const products = await features.query;

    res.status(200).json({
      status: 'success',
      results: products.length,
      data: {
        products,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        status: 'fail',
        message: 'No product found',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getSearchedProducts = async (req, res, next) => {
  try {
    const query = req.query.q;
    const queryRegex = new RegExp(query, 'i');

    const products = await Product.find({
      $or: [{ name: queryRegex }, { team: queryRegex }],
    });

    res.status(200).json({
      status: 'success',
      results: products.length,
      data: {
        products,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
