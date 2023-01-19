const express = require('express');
const { engine } = require('express-handlebars') 

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

app.get('/dashboard/calendar', (req, res) => {
    res.render('calendar', { title: 'Kaida | Calendar' });
});

app.get('/dashboard/publish', (req, res) => {
    res.render('publish', { title: 'Kaida | Post Approval' });
});

app.get('/dashboard/analytics', (req, res) => {
    res.render('analytics', { title: 'Kaida | Analytics' });
});

app.get('/dashboard/team', (req, res) => {
    res.render('team', { title: 'Kaida | Team' });
});

app.get('/onboarding', (req, res) => {
    res.render('onboarding-1', { title: 'Kaida | Onboarding' });
});

app.get('/onboarding-2', (req, res) => {
    res.render('onboarding-2', { title: 'Kaida | Onboarding' });
});

app.get('/onboarding-3', (req, res) => {
    res.render('onboarding-3', { title: 'Kaida | Onboarding' });
});
//error handling
app.use(function (req, res, next) {
    res.status(404).render("404")
  })
  
  
  app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500)
  })

// server
var server_port = process.env.PORT || 3000;
var server_host = process.env.localhost || '0.0.0.0';
app.listen(server_port, server_host, function () {
  console.log('Listening on port %d', server_port);
});