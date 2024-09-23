require('dotenv').config();
const express = require('express');
const router = require('./routes/Student.route');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', router);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});