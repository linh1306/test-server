const express = require('express');
const axios = require('axios');
const multer = require('multer');
const FormData = require('form-data');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/', upload.single('fileSource'), async (req, res) => {
  try {
    const file = req.file;
    const data = req.body;
    const trelloForm = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      trelloForm.append(key, value);
    });
    if (file) {
      trelloForm.append('fileSource', file.buffer, { filename: file.originalname });
    }
    const trelloResponse = await axios.post("https://api.trello.com/1/cards", trelloForm, {
      headers: {
        ...trelloForm.getHeaders(),
      },
    });
    const trelloResult = trelloResponse.data;
    res.json(trelloResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
