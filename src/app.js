const path = require('path')
const express = require('express');
const hbs = require('hbs')
const forecast = require('./Utils/forecast.js');
const geocode = require('./Utils/utils.js')


const app = express();
const port = process.env.PORT || 3000

//define path for express configs 
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//handles static pages.
app.use(express.static(publicDirectoryPath))


//handles dynamic pages
app.set('view engine','hbs');
app.set('views',viewsPath)
hbs.registerPartials(partialsPath);

app.get('',(req,res) =>{
        res.render('index',{
                title:'Weather',
                name: 'Raghuram'
        })
})

app.get('/about',(req,res)=>{
        res.render('about',{
                title: 'About Me',
                name:'Raghuram'
        })
})

app.get('/help',(req,res)=>{
        res.render('help',{
                title: 'Help',
                name: 'Raghuram',
                message:`You can either use the form or send me an email. I'll get back in touch with you as soon as possible! BTW my email id is 1993raghuram@gmail.com`
        })
})

app.get('/weather',(req,res) =>{

        const address = req.query.address;

        if(!address){
                return res.send({
                        error : 'Please provide the valid address'
                })
        }

        

        let  geoLocation = geocode.geoCode(address,(error,{latitude,longitude,place} = {})=>{
                      
                        if(error) return res.send({error})
                      else forecast.forecast(`${latitude},${longitude}`,place,(error,{placename,temp,precip, summary}= {}) =>{
                              if(error) return res.send({error})
                              else {
                                      const message = `In ${placename} it is ${summary} It's currently ${temp} degree celsius out there. There is ${precip}% possiblity of rain`
                                      return res.send({message,address})
                              }
                      })
        })
      

     
})

app.get('/help/*',(req,res)=>{
        res.render('helprem',{
                error:'Required help article not found',
                name:'Raghuram'
        })
})

app.get('*',(req,res) =>{
        res.render('Error404',{
                error:'404 Page Not Found !!',
                name:'Raghuram'
        })
})

app.listen(port,()=>{
        console.log('Server started at port 3000')
})