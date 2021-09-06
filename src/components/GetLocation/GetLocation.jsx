/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {Fragment, useState} from 'react'
import axios from 'axios'
import './GetLocation.scss'

const GetLocation = ({cityFound}) => {

    const [location, setlocation] = useState('');

    const apiKey = process.env.REACT_APP_API_KEY;

    const handleChange = (e)=>{
        setlocation(e.target.value);
       
    }
    

    const handleClick = async(city)=>{
             if(city){
                const {data} = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}&language=en-us&details=true&offset=25`)
                .catch((error) =>{
                    throw error;
                })
                const locationKey = data[0].Key;
                const cityName = data[0].LocalizedName;
                const administrativeArea = data[0].AdministrativeArea.LocalizedName;
                const country = data[0].Country.LocalizedName;
                cityFound({
                    locationKey,cityName,administrativeArea, country
                })
            }else{
                alert("Please enter a city name!")
            }
          
            
        }
    

    return (
        <Fragment>
            <label htmlFor="location">Enter the city name here</label><br/>
            
            <input type="text" id = "location" value={location} onChange={handleChange} placeholder = 'eg.Sydney'/><br/>

            <button onClick={()=>handleClick(location)}>SEARCH</button>

        </Fragment>
    )
}

export default GetLocation
