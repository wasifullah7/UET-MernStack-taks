const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const postRoutes = require('./routes/posts');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/posts', postRoutes);

mongoose.connect(process.env.MONGO_URI)

  .then(() => app.listen(5000, () => console.log('Server started at port 5000')))
  .catch(err => console.log(err));
