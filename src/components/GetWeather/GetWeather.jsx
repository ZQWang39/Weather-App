/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import GetLocation from '../GetLocation/GetLocation'
import axios from 'axios'
import {CircularProgress} from '@material-ui/core'
import './GetWeather.scss'

const GetWeather = () => {

    const [weatherData, setWeatherData] = useState('');
    const [locationKey, setLocationKey] = useState('');
    const [cityDetails, setCityDetails] = useState('');

    const apiKey = process.env.REACT_APP_API_KEY;
    console.log(apiKey)
    // const locationKey = '22889'

 const handleCityInfo=(cityInfo) => {
     setLocationKey(cityInfo.locationKey)
     setCityDetails(`${cityInfo.cityName}, ${cityInfo.administrativeArea}, ${cityInfo.country}`)

  }

    useEffect(   
        async() =>{
            if(locationKey){
                const {data} = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}&language=en-us&details=true&metric=true`)
                const formatedWeatherData = formatWeatherData(data.DailyForecasts);
                setWeatherData(formatedWeatherData)
            }
        },[locationKey])
        
     const formatIcon = (num) =>{
         const numString = num.toString();
         return numString.length === 1? '0' + numString : numString;
     }
   
    
     const getTime = (d)=>{
        const time = d.split(" ");
        return {
          date: time[0],
          month: time[1],
          day: time[2]
        }
    }

    
     const formatWeatherData = (items) => {
        return items.map(item => {
            
            const date = item.Date;
            const weather = item.Day.IconPhrase;
            const icon = formatIcon(item.Day.Icon);
            const max = item.Temperature.Maximum.Value;
            const min = item.Temperature.Minimum.Value;
            
            return {
                time:getTime(new Date(date).toString()),
                weather:weather,
                icon:icon,
                max:max,
                min:min
                
            }
           
        })
    }

    return (
        <div className='dashboard'>
            <div className='input'>
                <GetLocation cityFound = {handleCityInfo}/>
                <h2>{cityDetails}</h2>
            </div>
            <div className='display-weather'>
              {(weatherData)?(<ul>
                   {weatherData.map((item, index)=>(
                    <li key={index}>
                        {item.time.date} {item.time.day}/{item.time.month}
                        <img src={`https://developer.accuweather.com/sites/default/files/${item.icon}-s.png`} alt="weather-icon" /><br/>
                        {item.weather} <br/>
                        {item.min}℃/{item.max}℃
                        </li>
                    ) )}
                </ul>):(
                    <CircularProgress />
                )
              }
            </div>
            
        </div>
    )
}

export default GetWeather
