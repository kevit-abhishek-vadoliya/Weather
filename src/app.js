const path = require('path')
const express = require('express')
const hbs = require('hbs');
const mainGeoCode = require('./utils/geoCode');
const mainForecast = require('./utils/forecast');

const app = express()
const port = process.env.PORT || 3000;

//define paths for Express Config
const pathToPublic = path.join(__dirname, "../public")
const pathToViews = path.join(__dirname, "../Templates/views")
const pathToPartials = path.join(__dirname, "../Templates/partials")


//setup handlers for engine and views location
app.set('view engine','hbs')
app.set('views', pathToViews)
hbs.registerPartials(pathToPartials)


//setup general directory to serve
app.use(express.static(pathToPublic))


app.get('', (req,res)=>{
    res.render('index', {
        name: "Abhishek",
        title: "Home Page"
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        name: "Abhishek",
        title: "About Page"
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        message: "This is a help message",
        title: "Help Page",
        name: "Abhishek Vadoliya"   
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: "Please provide an address"
        })   
    }

    async function main(){
        const locData = await mainGeoCode(req.query.address)
        if(locData.error){
            return res.send({error: locData.error})
        }
        const foreData = await mainForecast(locData.latitude, locData.latitude)
        if(foreData.error){
            return res.send({error: foreData.error})
        }
        res.send({
            forecast: foreData,
            location: locData.location,
            address: req.query.address
        })
    }
    main()
    // geoCode(req.query.address, (error, {latitude,longitude,location}={})=>{
    //     if(error){
    //         return res.send({error})
    //      }
    //     forecast(latitude, longitude, (error, forecastData)=>{
    //         if(error){
    //             return res.send(error)
    //         }
    //         res.send({
    //             forecast: forecastData,
    //             location: location, 
    //             address: req.query.address 
    //         })

    //     } ) 
    // })
    
})  

app.get('/help/*', (req, res)=>{
    res.render('notFound',{
        errorMessage: "Help article not found",
        title: "404 Help",
        name: "Abhishek Vadoliya"
    })

})

app.get('*', (req, res)=>{
    res.render('notFound',{
        errorMessage: "Page not found",
        title: "404",
        name: "Abhishek Vadoliya"
    })

})

app.listen(port, ()=>{
    console.log("Server is running on port 3000")
})