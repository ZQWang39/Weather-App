
import React, {Fragment, useState} from 'react'
import axios from 'axios'
import './GetLocation.scss'
// import SearchIcon from '@material-ui/icons/Search';
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete'

const GetLocation = ({cityFound}) => {

    const [location, setlocation] = useState('');
    const [errorMessage, setErrorMessage] = useState('')

    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

    const handleChange = (e)=>{
        setlocation(e.target.value);    
    }
    
    const handleClick = async(city)=>{
             if(city){
                const {data} = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}&language=en-us&details=true`)
                if(data.length !== 0){
                    console.log(data)
                    const locationKey = data[0].Key;
                    const cityName = data[0].LocalizedName;
                    const administrativeArea = data[0].AdministrativeArea.LocalizedName;
                    const country = data[0].Country.LocalizedName;
                    cityFound({
                        locationKey,cityName,administrativeArea, country
                    }) 
                 }else{
                        setErrorMessage("Sorry, the city you entered is not available!")
                    }
              
            }else{
                setErrorMessage("Please enter a city name!")
            }
          
            
        }
    

    return (
        // <Fragment>
        //     <label htmlFor="location">Enter the city name here</label><br/>
        //     <input type="text" id = "location" value={location} onChange={handleChange} placeholder = 'eg.Sydney'/>
        //     <div className = "error-message">{errorMessage}</div>    

        //     {/* <span className="searchIcon"><SearchIcon /></span>     */}
        //     <button onClick={()=>handleClick(location)}>SEARCH</button>

        // </Fragment>
        <div>
        </div>
    )
}

export default GetLocation
