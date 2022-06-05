const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")


let app = express()
app.use(bodyParser.urlencoded({extended:true}))


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

app.post("/",(req,res)=>{

    let cityName = req.body.cityName
    let apiKey = "4b8ed1e204f010d4c6547bde333e21fd"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
    https.get(url,(response)=>{
        response.on("data",(data)=>{
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const desc = weatherData.weather[0].description
            res.write("<p>The Current Weather is "+  desc+"</p>" )
            res.write("<h1>the temprature in "+ cityName+ " is " + temp + "</h1>" )
            res.send()
        })
     
    })

})

app.listen(3000,()=>{
    console.log("listening at port 3000")
})