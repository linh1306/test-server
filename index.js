const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;


// Sử dụng middleware để parse dữ liệu JSON từ yêu cầu POST
app.use(bodyParser.json());

// Định nghĩa route POST để xử lý dữ liệu JSON
app.post('/test', (req, res) => {
  const inputData = req.body; // Dữ liệu JSON từ người dùng
  res.json(inputData);
});
// Định nghĩa một route đơn giản
app.get('/', (req, res) => {
  res.send('Hello, Render!');
});

// Chạy server trên cổng được cấu hình hoặc cổng 3000 nếu không có cấu hình
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
