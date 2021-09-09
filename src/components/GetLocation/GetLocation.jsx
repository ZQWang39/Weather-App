import React, { useState } from "react";
import axios from "axios";
import "./GetLocation.scss";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import scriptLoader from "react-async-script-loader";

const GetLocation = ({ cityFound, isScriptLoaded, isScriptLoadSucceed }) => {
  const [location, setlocation] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [errorMessage, setErrorMessage] = useState("");
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setCoordinates(latLng);
    setlocation(value);
  };
  const handleClick = async () => {
    if (location) {
      if (coordinates.lat && coordinates.lng) {
        const { data } = await axios.get(
          `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${coordinates.lat}%2C${coordinates.lng}&language=en-us&details=true&toplevel=true`
        );
        const locationKey = data.Key;
        const cityName = data.LocalizedName;
        const administrativeArea = data.AdministrativeArea.LocalizedName;
        const country = data.Country.LocalizedName;
        cityFound({
          locationKey,
          cityName,
          administrativeArea,
          country,
        });
        setlocation("");
        setCoordinates("");
        setErrorMessage("");
      } else {
        setErrorMessage("Sorry, the city you entered is not available!");
      }
    } else {
      setErrorMessage("Please enter a city name!");
    }
  };

  if (isScriptLoaded & isScriptLoadSucceed) {
    return (
      <div className="container">
        <PlacesAutocomplete
          value={location}
          onChange={setlocation}
          onSelect={handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: "eg. Sydney",
                  className: "location-input",
                })}
              />
              <ul className="suggestion-container">
                {suggestions.map((suggestion, index) => {
                  return (
                    <li
                      className="suggestion"
                      key={index}
                      {...getSuggestionItemProps(suggestion)}
                    >
                      {suggestion.description}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </PlacesAutocomplete>
        <div className="error">{errorMessage}</div>
        <button onClick={() => handleClick(location)}>SEARCH</button>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default scriptLoader([
  `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`,
])(GetLocation);
