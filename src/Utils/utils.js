const request = require('request')


const geoCode = (address,callback) =>{

        const url =`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicmFnaHVyYW1iYWNodSIsImEiOiJjazRhNjFwZnMwMHUxM2xrZDRlNWtpaXJkIn0.Z0d6go1zdXZdxibg7zY3vg&limit=2`;
        request({url,json:true},(error,{body})=>{
        
                if(error){
                        callback('"Unable to connect to location services !',undefined)
                }else if(body.features.length === 0){
                       callback('Location not available, try searching different location.',undefined)
                }else{
                        const locationData = body.features[0];
                        const latitude = locationData.center[1];
                        const longitude = locationData.center[0];
                        const place = locationData.place_name
                    
                        const location ={
                                latitude,
                                longitude,
                                place
                        }
                        callback(undefined, location)                                 
                }
        })
}



module.exports={
        geoCode
}