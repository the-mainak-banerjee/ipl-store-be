const Order = require('../models/orderModel'); // Adjust the path as necessary

exports.createOrder = async (req, res) => {
  try {
    const { orderPrice, orderItems, address, status } = req.body;
    const userId = req.user.id;

    let newOrder = await Order.create({
      orderPrice,
      customer: userId,
      orderItems,
      address,
      status,
    });

    newOrder = await newOrder.populate({
      path: 'orderItems.product',
    });

    res.status(201).json({
      status: 'success',
      data: {
        order: newOrder,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

exports.getAllOrdersForUser = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is passed as a route parameter

    const orders = await Order.find({ customer: userId }).populate({
      path: 'orderItems.product',
    });

    res.status(200).json({
      status: 'success',
      data: {
        orders,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};
