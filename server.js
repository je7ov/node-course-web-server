const fs = require('fs');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.use((req, res, next) => {
  // const now = new Date().toLocaleString();
  const now = new Date().toString();  
  const log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to log file');
    }
  });
  
  next();
});

app.use((req, res, next) => {
  res.render('maintenance');
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home', {
    currentYear: new Date().getFullYear()
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});

console.log("Starting server...");
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});