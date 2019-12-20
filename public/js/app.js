
const formDOM =document.querySelector('.form-container')
formDOM.autocomplete ='off'
formDOM.addEventListener('submit', (event)=>{
        event.preventDefault();

        const displayDOM = document.querySelector('.display')
        const displayRangeDOM = document.querySelector('.range')
        const searchDOM = document.querySelector('#search');

        const search = searchDOM.value;

       
        displayDOM.innerHTML = "<img class='loading' src='./img/loading.gif'>"

        const forecast =  fetchWeatherUpdates(search,(forecast,tempRange)=>{

                displayDOM.innerHTML ="";
                displayRangeDOM.innerHTML = "";

                displayDOM.innerHTML = `<h3>${forecast}</h3>`

                if(tempRange){
                        displayRangeDOM.innerHTML = `<h4 class="temp-range">${tempRange}</h4>`
                }
                searchDOM.value = ''


        })
})


function fetchWeatherUpdates(address,callback){

        const url = `/weather?address=${encodeURIComponent(address)}`
        fetch(url)
        .then(response => response.json())
        .then((forecast) =>{
                         if(forecast.error){
                                callback(forecast.error,undefined)
                        }else{
                                const {message, address, tempRange} = forecast;
                              callback(message,tempRange)
                        }
        })

}

       