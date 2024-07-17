const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Product = require('../../models/productModel');

dotenv.config({ path: './config.env' });

const db = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(db).then(() => {
  console.log('Connected to database');
});

const products = JSON.parse(
  fs.readFileSync(`${__dirname}/products.json`, 'utf-8'),
);

const importDataToDB = async () => {
  try {
    await Product.create(products);
    console.log('Products Updated successfully');
    process.exit();
  } catch (e) {
    console.log(e);
  }
};

const deleteDataFromDB = async () => {
  try {
    await Product.deleteMany();
    console.log('Products Deleted successfully');
    process.exit();
  } catch (e) {
    console.log(e);
  }
};

if (process.argv[2] === '--import') {
  importDataToDB();
} else if (process.argv[2] === '--delete') {
  deleteDataFromDB();
}
