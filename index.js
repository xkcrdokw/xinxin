var express = require("express"), cors = require("cors"), secure = require("ssl-express-www");
const path = require('path');
const os = require('os');
const fs = require('fs');
const ptz = require('./function/index') 
const axios = require('axios')

var app = express();
app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());
app.use(secure);
app.use(express.static(path.join(__dirname, 'public')));
const port = 3000;

app.get('/stats', (req, res) => {
  const stats = {
    platform: os.platform(),
    architecture: os.arch(),
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
    uptime: os.uptime(),
    cpuModel: os.cpus()[0].model,
    numCores: os.cpus().length,
    loadAverage: os.loadavg(),
    hostname: os.hostname(),
    networkInterfaces: os.networkInterfaces(),
    osType: os.type(),
    osRelease: os.release(),
    userInfo: os.userInfo(),
    processId: process.pid,
    nodeVersion: process.version,
    execPath: process.execPath,
    cwd: process.cwd(),
    memoryUsage: process.memoryUsage()
  };
  res.json(stats);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,  '/views/index.html'));
});

app.get('/chatbot', (req, res) => {
  res.sendFile(path.join(__dirname,  '/views/chatbot.html'));
});


//endpoin ai feature

app.get('/api/ai/gpt', async (req, res) => {
  try {
    const message = req.query.message;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await ptz.gpt(message);
    res.status(200).json({
      status: 200,
      creator: "Nash Team",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//endpoin downloader feature

app.get('/api/download/tiktok', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({ error: 'Parameter "url" tidak ditemukan' });
    }
    const response = await ptz.tiktok(url);
    res.status(200).json({
      status: 200,
      creator: "Nash Team",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//endpoin search feature

app.get('/api/search/stickerpack', async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
    const response = await ptz.stickerpack(query);
    res.status(200).json({
      status: 200,
      creator: "Nash Team",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/search/wallpaper', async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
    const response = await ptz.wallpaper(query);
    res.status(200).json({
      status: 200,
      creator: "Nash Team",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//endpoin stalk feature

app.get('/api/stalk/tiktok', async (req, res) => {
  try {
    const username = req.query.username;
    if (!username) {
      return res.status(400).json({ error: 'Parameter "username" tidak ditemukan' });
    }
    const response = await ptz.stalktt(username);
    res.status(200).json({
      status: 200,
      creator: "Nash Team",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//endpoin game feature

app.get('/api/game/tebakhewan', async (req, res) => {
  try {
    const response = await ptz.thewan();
    res.status(200).json({
      status: 200,
      creator: "Nash Team",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/game/tebakheroml', async (req, res) => {
  try {
    const response = await ptz.thero();
    res.status(200).json({
      status: 200,
      creator: "Nash Team",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//endpoin sticker feature

app.get('/api/sticker/brat', async (req, res) => {
  try {
    const text = req.query.text;
    if (!text) {
      return res.status(400).json({ error: 'Parameter "text" tidak ditemukan' });
    }
    const response = await axios.get(`https://brat.caliphdev.com/api/brat?text=${text}`, { responseType: 'arraybuffer' });
    res.set("Content-Type", "image/png");
    res.status(200).send(Buffer.from(response.data, 'binary'));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use((req, res, next) => {
res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Ada kesalahan pada server');
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
