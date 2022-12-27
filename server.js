const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose.set('strictQuery', true);
mongoose
  .connect(DB)
  .then(() => console.log('DB is Connected'))
  .catch((err) => console.log(err));
const port = 3000 || process.env.PORT;

const server = app.listen(port, () => {
  console.log(`App is running on port: ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection! Shutting Down...');
  console.log(
    `Unhandled Rejection Name: ${err.name}.\n Message: ${err.message}`
  );
  server.close(() => {
    console.log('Process Terminated!');
  });
});
