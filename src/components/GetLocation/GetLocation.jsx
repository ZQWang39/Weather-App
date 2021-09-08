
import React, { useState, Fragment} from 'react'
import axios from 'axios'
import './GetLocation.scss'
// import SearchIcon from '@material-ui/icons/Search';
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete'

const GetLocation = ({cityFound}) => {

    const [location, setlocation] = useState('');
    const [coordinates, setCoordinates] = useState({lat:null, lng:null});
    const [errorMessage, setErrorMessage] = useState('')

    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    // const handleChange = (e)=>{
    //   setlocation(e.target.value);
    // }
    const handleSelect = async(value)=>{
       // console.log(value)
    const results = await geocodeByAddress(value)
    //  console.log(results)
    const latLng = await getLatLng(results[0])
     setCoordinates(latLng)
     setlocation(value)
    }

    // const handleChange = (e)=>{
    //     setlocation(e.target.value);    
    // }
    
    const handleClick = async()=>{
             if(coordinates){
                const {data} = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${coordinates.lat}%2C${coordinates.lng}&language=en-us&details=true&toplevel=true`)
                if(data.length !== 0){
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
        // <Fragment>
        //     <label htmlFor="location">Enter the city name here</label><br/>
        //     <input type="text" id = "location" value={location} onChange={handleChange} placeholder = 'eg.Sydney'/>
        //     <div className = "error-message">{errorMessage}</div>    

        //     {/* <span className="searchIcon"><SearchIcon /></span>     */}
        //     <button onClick={()=>handleClick(location)}>SEARCH</button>

        // </Fragment>
        <div>
            <PlacesAutocomplete 
             value = {location} 
             onChange = {setlocation} 
             onSelect = {handleSelect}
             >
               {({getInputProps, suggestions, getSuggestionItemProps, loading}) => 
               <div>
                   <input {...getInputProps({placeholder: 'eg. Sydney',className: 'location-input', })}/>
                   <div>
                       {loading ? <Fragment>locading...</Fragment>:null}
                       {suggestions.map((suggestion,index) =>{
                           const style = {
                               backgroundColor:suggestion.active ? "rgba(29, 28, 28, 0.76)":"#fff"
                           };
                           console.log(suggestion)
                           return (
                               <div key={index} {...getSuggestionItemProps(suggestion, {style})}>
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
