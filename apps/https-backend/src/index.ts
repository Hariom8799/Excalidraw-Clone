import express from 'express';

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Hello, HTTPS Backend!');
});

app.listen(PORT, () => {
  console.log(`HTTPS Backend is running on port ${PORT}`);
});