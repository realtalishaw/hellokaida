const express = require('express');
const { engine } = require('express-handlebars') 
const stytch = require('stytch');
const bodyParser = require('body-parser');



const client = new stytch.Client({
    project_id: 'project-test-bb5f0dbb-46ec-4126-a3e7-1110532b7ec2',
    secret: 'secret-test-Fm1m4tcDFrhaOS9ZT--UUpvKfvg4P9r_iwQ=',
    env: stytch.envs.test,
  });

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
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

app.post('/authenticate', async (req, res) => {
    const email = req.body.email;
    console.log(email);
    const loginOrCreateWithMagicLink = async () => {
        const params = {
          email: email,
          login_magic_link_url: "http://localhost:3000/authenticate",
          signup_magic_link_url: "http://localhost:3000/authenticate",
        };
      
        const response = await client.magicLinks.email.loginOrCreate(params);
      
        console.log(response);
      };
      
      loginOrCreateWithMagicLink().then().catch(err => console.log(err));
  res.redirect('/authenticate');
});

app.get('/authenticate', async (req, res) => {
    const authenticateMagicLink = async (token) => {
        const response = await client.magicLinks.authenticate(token);
      
        console.log(response);
      };
   const { token } = req.query;
   if (token) {
    console.log(token);
    await authenticateMagicLink(token).then().catch(err => console.log(err));
    res.redirect('/dashboard/calendar')
   } else { 
    res.render('authenticate', { title: 'Kaida | Authenticate' });
   }

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