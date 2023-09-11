// const request = require('request')

// const forecast = (latitude,longitude, callback)=>{
//     const url = `http://api.weatherstack.com/current?access_key=1054bd59d7458e563e9c3a5c4d4816b0&query=${latitude},${longitude}`
//     request({ url: url, json: true }, (error, {body}) => {
//         if (error) {
//             callback("Unable to connect to the weather service", undefined)
//         }
//         else if (body.error) {
//             callback("Wrong longitude, latitude", undefined)
//         }
//         else{
//             callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} and feels like ${body.current.feelslike}`
//         )
//         }
//     })
// }
// module.exports = forecast

const axios = require('axios');

async function forecast(latitude, longitude) {
    try {
        let url = `http://api.weatherstack.com/current?access_key=1054bd59d7458e563e9c3a5c4d4816b0&query=${latitude},${longitude}`
        let foreData = await axios.get(url)
        foreData = foreData.data

        if (foreData.length == 0) {
            return {
                error: "Please enter appropriate latitude and longitude"
            }
        }
        else {
            return `${foreData.current.weather_descriptions[0]}. It is currently ${foreData.current.temperature} and feels like ${foreData.current.feelslike}`
        }
    }
    catch (error) {
        return {
            error: "unable to connect to weather service"
        }

    }
}
async function mainForecast(longitude, latitude){
    return await forecast(longitude, latitude)
}

module.exports = mainForecast 