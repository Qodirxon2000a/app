const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(bodyParser.json());

let receipts = [];

// Cheklarni qabul qilish
app.post('/api/receipts', (req, res) => {
  const { dateTime, user, products, totalSum } = req.body;

  if (!dateTime || !user || !products || totalSum === undefined) {
    return res.status(400).json({ error: "Barcha ma'lumotlarni kiriting!" });
  }

  const receipt = {
    id: receipts.length + 1,
    dateTime,
    user,
    products,
    totalSum,
  };

  receipts.push(receipt);

  console.log('Yangi chek saqlandi:', receipt);
  res.json({ message: 'Chek muvaffaqiyatli saqlandi!', receipt });
});

// Saqlangan cheklar ro'yxatini olish
app.get('/api/receipts', (req, res) => {
  res.json(receipts);
});

// Serverni ishga tushirish
app.listen(PORT, () => {
  console.log(`Server ishga tushdi: http://localhost:${PORT}`);
});
