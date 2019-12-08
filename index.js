const path = require('path');
const express = require('express');
const zipdb = require('zippity-do-dah');
const forcasteIo = require('forecastio');

const SECRET_KEY = 'Your SECRET KEY FROM FORECAST';

const app = express();
const weather = new forcasteIo(SECRET_KEY);

const PORT = process.env.PORT || 5000;

app.use(express.static(path.resolve(__dirname,'public')));

app.set('views', path.resolve(__dirname,'views'));
app.set('view engine', 'hbs');

app.get('/', ( req, res) => {
    res.render(path.resolve(__dirname,'views','index.hbs'));
});

app.get('/:code', ( req, res, next) => {
    var zipcode = req.params.code;
    var location = zipdb.zipcode(zipcode);

    if( !location.zipcode){
        next();
        return;
    }

    var lat = location.latitude;
    var long = location.longitude;

    weather.forecast(lat, long, ( err, data ) =>{
        if ( err ) {
            next();
            return;
        }

        var response = {
            zipcode: zipcode,
            temperature: data.currently.temperature
        };        

        
        res.json(response);
    });//end weather forecast
});// end get


app.use(( req, res ) => {
    res.status(404).render('404');
});

app.listen(PORT , () => {
    console.log(`Server running on port ${ PORT }`);
});