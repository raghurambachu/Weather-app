const request = require('request')

//coordinate= 'latitude,longitude'

const forecast = (coordinate,placename,callback) =>{
        const url =`https://api.darksky.net/forecast/5a87874298d2a377580387c5285e6917/${coordinate}?lang=en&units=si&exclude=minutely,hourly,flags`;
        request({url , json:true},(error,response) => {
                if(error){
                        callback('Unable to connect to weather Services !',undefined)
                }else if (response.body.error){
                        callback('Search with valid address',undefined)
                } else{
                        const data = response.body;
                        const temp = data.currently.temperature;
                        const precip = data.currently.precipProbability;
                        const summary = data.daily.data[0].summary;
                        const weatherData = {
                                placename,
                                temp,
                                precip,
                                summary
                        }
                        callback(undefined,weatherData)
                }
        })
}











module.exports = {
        forecast
}