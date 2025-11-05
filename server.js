const express = require('express');
const fetch = require('node-fetch');
const { XMLParser } = require('fast-xml-parser');
const app = express();
const PORT = 3000;

const API_KEY = 'ea2ab2e03de6ca2713e678cfffbd09fd304648d6d0be836d68705dbb975ed24f'; // 발급받은 키로 교체

app.use(express.static('public')); // public 폴더에서 HTML/JS/CSS 제공

// API 프록시
app.get('/search', async (req, res) => {
  const keyword = req.query.q;
  const url = `http://apis.data.go.kr/1613000/ElevatorService/getElevatorInfo?serviceKey=${API_KEY}&keyword=${encodeURIComponent(keyword)}&numOfRows=10&pageNo=1`;

  try {
    const response = await fetch(url);
    const xml = await response.text();
    const parser = new XMLParser();
    const json = parser.parse(xml);

    const items = json.response?.body?.items?.item || [];
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));