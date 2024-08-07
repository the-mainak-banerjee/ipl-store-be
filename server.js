const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({
  path: './config.env',
});

const db = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(db, {
    connectTimeoutMS: 30000, // Increase connection timeout
    socketTimeoutMS: 45000,
  })
  .then(() => console.log('database connection established'))
  .catch((err) => console.log(err));

const port = process.env.PORT;

app.listen(port, () => {
  console.log('listening on port', port);
});
