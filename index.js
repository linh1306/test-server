const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Định nghĩa một route đơn giản
app.get('/', (req, res) => {
    res.send('Hello, Render!');
});

// Chạy server trên cổng được cấu hình hoặc cổng 3000 nếu không có cấu hình
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
