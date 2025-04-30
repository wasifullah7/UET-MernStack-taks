const express = require('express');
const cors = require('cors'); // <-- Add this line

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // <-- Add this line

app.use(express.json());

// Your routes go here
app.get('/api/todos', (req, res) => {
  res.json([{ id: 1, text: 'Sample Todo' }]);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
