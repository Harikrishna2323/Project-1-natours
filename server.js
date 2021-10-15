const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

//Unhandled errors
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('Unhandled rejection. Server shutting down...');
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message, err);
  console.log('Uncaught exception. Server shutting down...');
  process.exit(1);
});

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Connection established with database');
  });

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`App started running in port: ${PORT}`)
);

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
