const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now} ${req.method}  ${req.url}`;
  console.log(log);

  fs.appendFile('server.log', log + '/n', (err) => {
    if (err) {
      console.log('unable to append to server.log');
    }
  });

  next();
});

// app.use((req, res, next) => {
//   res.render('maintainance.hbs');
// });

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  //res.send('<H1>Hello express</H1>');
  res.send({
    name: 'Andrew',
    likes: [
      'biking',
      'cities'
      ]
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page'
  });
});

app.get('/home', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMessage: 'Hello!'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'unable to handle request'
  });
});

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
