
import React, { useState} from 'react'
import axios from 'axios'
import './GetLocation.scss'
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete'

const GetLocation = ({cityFound}) => {

    const [location, setlocation] = useState('');
    const [coordinates, setCoordinates] = useState({lat:null, lng:null});
    const [errorMessage, setErrorMessage] = useState('')
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

    const handleSelect = async(value)=>{
    const results = await geocodeByAddress(value)
    const latLng = await getLatLng(results[0])
     setCoordinates(latLng)
     setlocation(value)
    }
    
    const handleClick = async()=>{
             if(location){
                 if(coordinates.lat&&coordinates.lng){
                    const {data} = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${coordinates.lat}%2C${coordinates.lng}&language=en-us&details=true&toplevel=true`)
                    console.log(data)
                    const locationKey = data.Key;
                    const cityName = data.LocalizedName;
                    const administrativeArea = data.AdministrativeArea.LocalizedName;
                    const country = data.Country.LocalizedName;
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
        <div>
            <PlacesAutocomplete  value = {location} onChange = {setlocation} onSelect = {handleSelect}>
               {({getInputProps, suggestions, getSuggestionItemProps, loading}) => 
               <div>
                   <input {...getInputProps({placeholder: 'eg. Sydney',className: 'location-input'})}/>
                   <div className="container">
                       {suggestions.map((suggestion,index) =>{
                           return (
                               <div className="suggestion" key={index} {...getSuggestionItemProps(suggestion)}>
                                   {suggestion.description}
                               </div>
                           )
                       })}
                   </div>

               </div>}  
            </PlacesAutocomplete>
            <div className = "error-message">{errorMessage}</div> 
            <button onClick={()=>handleClick(location)}>SEARCH</button>
        </div>
    )
}

export default GetLocation
