const express = require('express');
const dbConnection = require('./database');
const studentRouter = require('./routes/student.routes');
const cors = require('cors');
const app = express();

app.use(express.json());  // read about this 
app.use(cors());

dbConnection();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/student', studentRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
