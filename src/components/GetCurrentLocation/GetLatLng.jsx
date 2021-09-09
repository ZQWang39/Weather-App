/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import axios from "axios";

const GetLatLng = ({ latLngFound }) => {
  const ipApiKey = process.env.REACT_APP_IP_API_KEY;
  useEffect(async () => {
    const { data } = await axios.get(
      `https://geolocation-db.com/json/${ipApiKey}`
    );
    const lat = data.latitude;
    const lng = data.longitude;
    latLngFound({ lat: lat, lng: lng });
  }, []);

  return <div></div>;
};

export default GetLatLng;
