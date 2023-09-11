// const request = require('request')

// const geoCode = (address,callback)=>{
//     const url = `https://geocode.maps.co/search?q=${encodeURIComponent(address)}&limit=1`
//     request({ url: url, json: true }, (error, {body}) => {
//         if (error) {
//             callback("Lower level Error", undefined)
//         }
//         else if (body.length==0) {
//             callback("Enter correct location", undefined)
//         }
//         else{
//             callback(undefined, {
//                 latitude: body[0].lat,
//                 longitude: body[0].lon,
//                 location: body[0].display_name
//             })
//         }
//     })
// }
// module.exports = geoCode;

const axios = require('axios');

async function geoCode(address) {
    try {
        let geoData = await axios.get(`https://geocode.maps.co/search?q=${encodeURIComponent(address)}&limit=1`)
        geoData = geoData.data

        if (geoData.length == 0) {
            return {
                error: "Please enter appropriate location"
            }
        }
        else {
            return {
                latitude: geoData[0].lat,
                longitude: geoData[0].lon,
                location: geoData[0].display_name
            }
        }
    }
    catch (error) {
        return {
            error: "Lower level error"
        }

    }
}
async function mainGeoCode(address){
    return await geoCode(address)

}

module.exports = mainGeoCode;
