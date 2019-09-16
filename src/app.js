const express = require('express')
const path = require('path')
const hbs =  require('hbs')

const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')

// Firing Up Express Server
const app = express()

// Setting public Directory
const publicPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup Handlebars Engine 
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup Static Directory 
app.use(express.static(publicPath))


app.get('', (req,res) =>{
    res.render('index',{
        title: 'Weather',
        name: 'Omar Shindy'
    })
})


app.get('/about', (req,res) =>{
    res.render('about',{
        title: 'About',
        name: "Omar Shindy"
    })
})


app.get('/help',(req,res) =>{
    res.render('help',{
        helpText: 'Some Help Text',
        title: 'Help',
        name: 'Omar Shindy'
    })
})

app.get('/weather', (req,res) =>{
    if(!req.query.address){
        return res.send({
            error: 'You Must Provide an Address'
        })
    }else{
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
            if (error){
                return res.send({error})   
            }
            forecast(latitude,longitude, (error,forecastData) =>{
                if (error){
                    return res.send({error})   
                }
                res.send({
                    forecastData: forecastData,
                    location:location
                })    
            })
        }) 
    }

})




app.get('/help/*', (req,res) =>{
    res.render('404',{
        errorMessage: 'Help Article Not found ,Please Try Again!'
    })
})

app.get('*', (req,res) =>{
    res.render('404',{
        errorMessage: "Page isn't found, Please Try Again!"
    })
})

app.listen(3000, () =>{
    console.log('Server is up on Port 3000');
    
})