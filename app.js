const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html")

})

app.post("/", function(req, res){
    console.log(req.body.location);

    units = "metric"
    const app_key = "cca95279e687e62744993f86a14b74cb"
    const location = req.body.location
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + app_key + "&units=" + units +""
    https.get(url, function(response){
        console.log(response.statusCode);
    
        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.humidity
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            // img_url = "https://openweathermap.org/img/wn"+icon+"@2x.png"

            res.write("<h1>The temp in " + location + " is " + temp + " deg Celcius.</h1>");  
            res.write("<h1>Weather type in " + location + " is " + weatherDescription);  
            // res.write("<img src =" + img_url + ">");    
            res.send()
        })
    })
})

app.listen("3000", function(req, res){
    console.log("Server is running on 3000")
})