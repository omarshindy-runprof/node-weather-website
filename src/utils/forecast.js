const request = require('request')


const getForeCast = (long, lat, callback) =>{
    url = 'https://api.darksky.net/forecast/1cdbb7c3d91f860e597eb8ca591690b2/'+ encodeURIComponent(long)+ ',' +encodeURIComponent(lat)

    request({ url, json:true }, (error, {body}) =>{
        if (error){
            callback('Unable to connect to weather service!',undefined)
        }else if (body.error){
            callback('Unable to Find Location!', undefined)
        }else{
            callback(undefined,{
                summary:body.daily.data[0].summary,
                temperature:body.currently.temperature,    
                chanceToRain:body.currently.precipProbability,
                tempHigh:body.daily.data[0].temperatureHigh,
                tempHigh:body.daily.data[0].temperatureLow,

            })
        }
    })
}

module.exports = getForeCast