const express = require('express');  
const hbs = require('hbs');  
const fs = require('fs');  
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//logger
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log)
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log!')
        }
    })
    next();
});

//maint
//app.use((req, res, next) => {
//    res.render('maintenance.hbs', {
//        pageTitle: 'Maintenance Mode',
//        maintenanceMessage: 'Sorry, the website is currently down.  Maintenance is being performed.  Please try again leter.'
//    });
//});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {  
    //res.send('<html><head></head><body><h1>Hello Express!</h1></body></html>')
    //res.send({
    //    name: 'Thad',
    //    likes: [
    //        'bowling',
    //        'airplanes',
    //        'programming'
    //    ]
    //});
    res.render('home.hbs', {
        pageTitle: 'Welcome',
        welcomeMessage: 'Welcome to our web site!',
    });
});

app.get('/about', (req, res) => {  
    res.render('about.hbs', {
        pageTitle: 'About Time',
    });
});

app.get('/bad', (req, res) => {  
    res.send({
        errorMessage: 'Unable to fulfill the request...Please try again later!',
    });
});

app.get('/project', (req, res) => {  
    res.render('project.hbs', {
        pageTitle: 'Project Notes',
    });
});

//const path = require('path');  
//const exphbs = require('express-handlebars');

//const router = express.Router();

app.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
