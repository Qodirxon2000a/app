const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// CORS middleware
app.use(cors());

// Your routes here
app.post('/print', (req, res) => {
  // Print functionality
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
