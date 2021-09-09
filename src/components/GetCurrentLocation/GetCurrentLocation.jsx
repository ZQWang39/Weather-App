/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import GetLatLng from "./GetLatLng.jsx";
const GetCurrentLocation = ({ currentLocation }) => {
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const handleLatLng = (latLng) => {
    setCoordinates(latLng);
  };

  useEffect(async () => {
    if (coordinates.lat && coordinates.lng) {
      const { data } = await axios.get(
        `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${coordinates.lat}%2C${coordinates.lng}&language=en-us&details=true&toplevel=false`
      );
      const locationKey = data.Key;
      const locationName = data.LocalizedName;
      currentLocation({ locationKey, locationName });
    }
  }, [coordinates]);

  return (
    <div>
      <GetLatLng latLngFound={handleLatLng} />
    </div>
  );
};

export default GetCurrentLocation;
