
const formDOM =document.querySelector('.form-container')
formDOM.autocomplete ='off'
formDOM.addEventListener('submit', (event)=>{
        event.preventDefault();

        const displayDOM = document.querySelector('.display')
        const searchDOM = document.querySelector('#search');
        const search = searchDOM.value;

       
        displayDOM.innerHTML = "<img class='loading' src='./img/loading.gif'>"

        const forecast =  fetchWeatherUpdates(search,(forecast)=>{

                displayDOM.innerHTML ="";
                displayDOM.innerHTML = `<h3>${forecast}</h3>`
                searchDOM.value = ''

        })
})


function fetchWeatherUpdates(address,callback){

        const url = `/weather?address=${encodeURIComponent(address)}`
        fetch(url)
        .then(response => response.json())
        .then((forecast) =>{
                         if(forecast.error){
                                callback(forecast.error)
                        }else{
                              callback(forecast.message)
                        }
        })

}

       