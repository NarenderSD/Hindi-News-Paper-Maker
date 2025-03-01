const express = require('express');
const app = express();
const { generateImage } = require('./generate');
const path = require('path');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));

app.post('/generate', async (req, res) => {
  const { title, article, caption, image } = req.body;
  try {
    const output = await generateImage(title, article, caption, image);
    res.send({ file: output });
  } catch (error) {
    res.status(500).send({ error: 'Image generation failed' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));