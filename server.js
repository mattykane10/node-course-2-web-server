const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

//Logger Middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log)
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

//maintenance mode
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

//static help page
app.use(express.static(__dirname + '/public'));

//Helper files will pass items back to the app
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Asaaaah Duh! Welcome to da page!'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects Page',
    welcomeMessage: 'Asaaaah Duh! Welcome to da page!'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage:'This page is an error'
  });
});

app.listen(port, () =>{
  console.log(`Server is up on port ${port}`)
});
