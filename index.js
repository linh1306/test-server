const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/', async (req, res) => {
  const inputData = req.body;
  const data = {
    "key": "e3c9be8a60dfcddf028d8261b265114b",
    "token": "ATTA202fea308de0c7eb62c8b711a64441deeea454c02e8b01954e261f9f56908a5a38DF27DA",
    "idList": "6581457631dc4371ad36bb24",
    "name": inputData.name,
    "desc": inputData.desc,
    "fileSource": inputData.fileSource
  }
  res.json(inputData);

  axios.post("https://api.trello.com/1/cards", data)
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
