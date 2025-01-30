const sequelize = require('./database/sequelize')
const express = require('express');
const port = 4580;
const cors = require('cors');
const userRouter = require('./router/userRouter')
const expenseRouter = require('./router/expenseRouter')
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/v1', userRouter);
app.use('/api/v1', expenseRouter);


const server = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

server()

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})