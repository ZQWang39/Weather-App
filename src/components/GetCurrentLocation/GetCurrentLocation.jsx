import React, { useState, useEffect } from "react";
import axios from "axios";
import GetLatLng from "./GetLatLng.jsx";
const GetCurrentLocation = ({ currentLocation }) => {
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const handleLatLng = (latLng) => {
    setCoordinates(latLng);
  };

  useEffect(() => {
    if (coordinates.lat && coordinates.lng) {
      axios
        .get(
          `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${coordinates.lat}%2C${coordinates.lng}&language=en-us&details=true&toplevel=false`
        )
        .then((res) => {
          const data = res.data;
          const locationKey = data.Key;
          const locationName = data.LocalizedName;
          currentLocation({ locationKey, locationName });
        });
    }
  }, [coordinates.lat, coordinates.lng, apiKey, currentLocation]);

  // useEffect(() => {
  //   async function fetchData() {
  //     if (coordinates.lat && coordinates.lng) {
  //       const { data } = await axios.get(
  //         `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${coordinates.lat}%2C${coordinates.lng}&language=en-us&details=true&toplevel=false`
  //       );
  //       const locationKey = data.Key;
  //       const locationName = data.LocalizedName;
  //       currentLocation({ locationKey, locationName });
  //     }
  //   }
  //   fetchData();
  // }, [coordinates.lat, coordinates.lng, apiKey, currentLocation]);

  return (
    <div>
      <GetLatLng latLngFound={handleLatLng} />
    </div>
  );
};

export default GetCurrentLocation;
