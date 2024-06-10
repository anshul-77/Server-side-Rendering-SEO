import express from 'express';
import https from 'https';
import { StaticRouter } from 'react-router-dom/server';
import ReactDOMServer from 'react-dom/server';
import App from '../client/components/App';
import fs from 'fs';
import path from 'path';
import mysql from 'mysql';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use('/static', express.static(__dirname));
const PORT = process.env.PORT || 3001; // Default to 3001 if PORT not specified

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Database connection setup
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

// Routes

app.get('/users', (req, res) => {
  const sql = "SELECT * FROM users ORDER BY id";
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json(err); // Use status code 500 for server errors
    return res.json(data);
  });
});

app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const sql = "SELECT * FROM users WHERE id = ?";
  db.query(sql, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(data[0]);
  });
});

app.get('/users/search/:id', (req, res) => {
  const userId = req.params.id;
  const sql = "SELECT * FROM users WHERE id = ?";
  db.query(sql, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(data[0]);
  });
});

app.post('/users', (req, res) => {
  const { id, name, phone, email } = req.body;
  const sql = "INSERT INTO users (id, name, phone, email) VALUES (?, ?, ?, ?)";
  db.query(sql, [id, name, phone, email], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json({ id, name, phone, email });
  });
});

// Read and parse data.json file
const dataFilePath = path.resolve(__dirname, '../src/data/data.json'); // Use path.resolve
let usersData = [];
try {
  const data = fs.readFileSync(dataFilePath, 'utf-8');
  usersData = JSON.parse(data);
} catch (err) {
  console.error('Error reading data.json:', err);
}

// Dynamic route to get user data by ID from data.json
app.get('/data/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = usersData.find(u => u.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

/**
 * Produces the initial non-interactive HTML output of React
 * components. The hydrateRoot method is called on the client
 * to make this HTML interactive.
 * @param {string} location
 * @return {Promise<string>}
 */
const createReactApp = async (location) => {
  const reactApp = ReactDOMServer.renderToString(
    <StaticRouter location={location}>
      <App />
    </StaticRouter>
  );
  const html = await fs.promises.readFile(path.resolve(__dirname, 'index.html'), 'utf-8');
  const reactHtml = html.replace('<div id="root"></div>', `<div id="root">${reactApp}</div>`);
  return reactHtml;
};

// Serve the sitemap.xml file
app.get('/sitemap.xml', (req, res) => {
  const sitemapPath = path.resolve(__dirname, '../sitemap.xml'); // Use path.resolve
  res.sendFile(sitemapPath);
});

// Serve the sitemap.html file
app.get('/sitemap.html', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../sitemap.html'));
});

// Serve React App for all other routes
app.get('*', async (req, res) => {
  const indexHtml = await createReactApp(req.url);
  res.status(200).send(indexHtml);
});

app.post("/weatherdetail", function (req, res) {
  const city = req.body.cityname;
  const apikey = process.env.API_KEY;
  const unit = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=${unit}`;

  https.get(url, function (response) {
    let data = '';

    response.on('data', function (chunk) {
      data += chunk;
    });

    response.on('end', function () {
      const weatherData = JSON.parse(data);
      if (weatherData.cod !== 200) {
        res.status(weatherData.cod).json({ error: weatherData.message });
        return;
      }

      const weather = {
        condition: weatherData.weather[0].description,
        temp: weatherData.main.temp,
        imageurl: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
      };

      res.json(weather);
    });
  }).on('error', function (err) {
    res.status(500).json({ error: err.message });
  });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
