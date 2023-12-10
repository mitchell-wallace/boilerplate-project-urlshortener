require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const isUrl = require('is-url');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));
app.use(bodyParser.urlencoded({extended: false}));

// Application variables
const urlArray = []; 
  // each element is an original_url, corresponding index is short_url
  // project scope does not require persistence or removal of elements

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', (req, res) => {
  var original_url;
  var short_url;

  // validate 'url' value and assign to original_url
  if (!req.body.url) {
    res.json({'error': 'invalid url'});
    return;
  }
  if (!isUrl(req.body.url)) {
    res.json({'error': 'invalid url'});
    return;
  }
  original_url = req.body.url;

  // store original_url and generate short_url
  short_url = urlArray.push(original_url) - 1;

  res.json({"original_url": original_url, "short_url": short_url});
});

app.get('/api/shorturl/:id', (req, res) => {

  // search urlArray for short_url == id; redirect to corresponding original_url
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
