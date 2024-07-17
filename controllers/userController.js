const User = require('../models/userModel');

exports.addAdress = async (req, res) => {
  const addressData = req.body;
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.address = addressData;
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { address: user.address },
      { new: true },
    );
    res.status(200).json({
      message: 'Address updated successfully',
      address: updatedUser.address,
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while updating the cart',
      error: error.message,
    });
  }
};

exports.removeAddress = async (req, res) => {
  const { addressId } = req.query;
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const addressItemIndex = user.address.findIndex((item) =>
      item._id.equals(addressId),
    );

    if (addressItemIndex === -1) {
      return res.status(500).json({
        message: 'The address does not exist',
      });
    }

    user.address.splice(addressItemIndex, 1);
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { address: user.address },
      { new: true },
    );
    res.status(200).json({
      message: 'Address deleted successfully',
      address: updatedUser.address,
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while updating the cart',
      error: error.message,
    });
  }
};
