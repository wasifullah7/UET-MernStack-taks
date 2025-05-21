const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const postRoutes = require('./routes/posts');

const app = express();
app.use(cors());
app.use(express.json());
app.use(postRoutes); // Or: app.use('/api', postRoutes);

mongoose.connect('mongodb+srv://umairkhan:Uk531063@cluster0.tryvfgn.mongodb.net/blogDB?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(5000, () => {
      console.log('🚀 Server running on http://localhost:5000');
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
