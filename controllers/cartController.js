const User = require('../models/userModel');

exports.updateCart = async (req, res) => {
  const { productId, qty } = req.body;
  if (!productId) {
    return res.status(500).json({
      message: 'An error occurred while updating the cart',
      error: 'Product not found',
    });
  }
  const userId = req.user.id; // assuming user ID is available in req.user

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const cartItem = user.cartItems.find((item) =>
      item.product.equals(productId),
    );

    if (cartItem) {
      if (qty > 0) {
        cartItem.qty = qty;
      } else {
        const cartItemIndex = user.cartItems.findIndex((item) =>
          item.product.equals(productId),
        );
        user.cartItems.splice(cartItemIndex, 1);
      }
    } else {
      // If product is not in cart, add it
      user.cartItems.push({ product: productId, qty });
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { cartItems: user.cartItems },
      { new: true },
    ).populate('cartItems.product');

    res.status(200).json({
      message: 'Cart updated successfully',
      cartItems: updatedUser.cartItems,
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while updating the cart',
      error: error.message,
    });
  }
};

exports.getCart = async (req, res) => {
  const userId = req.user.id; // assuming user ID is available in req.user

  try {
    const user = await User.findOne({ _id: userId }).populate(
      'cartItems.product',
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ cartItems: user.cartItems });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while fetching the cart',
      error: error.message,
    });
  }
};

exports.clearCart = async (req, res) => {
  const userId = req.user.id; // assuming user ID is available in req.user

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.cartItems.length > 0) {
      user.cartItems = [];
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { cartItems: user.cartItems },
      { new: true },
    ).populate('cartItems.product');

    res.status(200).json({
      message: 'Cart deleted successfully',
      cartItems: updatedUser.cartItems,
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while updating the cart',
      error: error.message,
    });
  }
};
