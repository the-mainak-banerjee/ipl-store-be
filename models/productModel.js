const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A product must have a name'],
    trim: true,
  },
  description: String,
  slug: String,
  price: {
    type: Number,
    required: [true, 'A product must have a price'],
  },
  team: {
    type: String,
    required: [true, 'A product must have a team'],
    enum: ['csk', 'dc', 'gt', 'kkr', 'lsg', 'mi', 'pbks', 'rcb', 'rr', 'srh'],
  },
  category: {
    type: String,
    required: [true, 'A product must have a category'],
    enum: ['jersy', 'cap', 'mask'],
  },
  rating: {
    type: Number,
    default: 3.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
  },
  discount: Number,
  src: {
    type: String,
    required: [true, 'A product must have a image src'],
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

productSchema.pre('save', function (next) {
  this.slug = this.name.split(' ').join('').toLowerCase();
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
