const User = require('../models/userModel');

exports.addToWishlist = async (req, res) => {
  const { productId, add = true } = req.body;
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const wishListItem = user.wishList.find((item) => item.equals(productId));

    if (wishListItem) {
      if (!add) {
        const wishlistItemIndex = user.wishList.findIndex((item) =>
          item.equals(productId),
        );

        user.wishList.splice(wishlistItemIndex, 1);
      } else {
        return res.status(200).json({
          message: 'Item is already added',
        });
      }
    } else {
      user.wishList.push(productId);
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { wishList: user.wishList },
      { new: true },
    ).populate('wishList');
    res.status(200).json({
      message: 'Wishlist updated successfully',
      wishList: updatedUser.wishList,
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while updating the wishlist',
      error: error.message,
    });
  }
};

exports.getWishlist = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId).populate('wishList');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ wishListItems: user.wishList });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while getting the wishlist',
      error: error.message,
    });
  }
};
