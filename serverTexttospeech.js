const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3013;

app.use(cors());
app.use(express.json());

app.post('/text-to-speech', async (req, res) => {
  try {
    const { text, languageCode, voiceName, ssmlGender, audioEncoding } = req.body;

    const options = {
      method: 'POST',
      url: 'https://joj-text-to-speech.p.rapidapi.com/',
      headers: {
        'content-type': 'application/json',
        'Content-Security-Policy': "script-src 'self' 'https://ssl.google-analytics.com';",
        'X-RapidAPI-Key': '6c4153b579msh3b88fb9e42fb3dap1c3822jsn700d8fa34f4a',
        'X-RapidAPI-Host': 'joj-text-to-speech.p.rapidapi.com'
      },
      data: {
        input: {
          text: text
        },
        voice: {
          languageCode: languageCode,
          name: voiceName,
          ssmlGender: ssmlGender
        },
        audioConfig: {
          audioEncoding: audioEncoding
        }
      }
    };

    const response = await axios.request(options);
    const audioData = response.data;

    res.send(audioData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
