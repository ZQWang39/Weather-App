import React, { useEffect } from "react";
import axios from "axios";

const GetLatLng = ({ latLngFound }) => {
  const ipApiKey = process.env.REACT_APP_IP_API_KEY;

  useEffect(() => {
    axios.get(`https://geolocation-db.com/json/${ipApiKey}`).then((res) => {
      const data = res.data;
      const lat = data.latitude;
      const lng = data.longitude;
      latLngFound({ lat: lat, lng: lng });
    });
  }, [ipApiKey, latLngFound]);

  return <div></div>;
};

export default GetLatLng;
