/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./GetCurrentWeather.scss";
import GetCurrentLocation from "../GetCurrentLocation/GetCurrentLocation";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";

const GetCurrentWeather = () => {
  const [locationKey, setLocationKey] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [currentWeather, setCurrentWeather] = useState("");
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const handleLocationInfo = (locationInfo) => {
    setLocationKey(locationInfo.locationKey);
    setCurrentLocation(locationInfo.locationName);
  };
  const formatIcon = (num) => {
    const numString = num.toString();
    return numString.length === 1 ? "0" + numString : numString;
  };

  useEffect(async () => {
    if (locationKey) {
      const { data } = await axios.get(
        `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=${apiKey}&language=en-us&details=true&metric=true`
      );
      const icon = formatIcon(data.DailyForecasts[0].Day.Icon);
      const weather = data.DailyForecasts[0].Day.IconPhrase;
      const rain = `${data.DailyForecasts[0].Day.Rain.Value} mm`;
      const wind = `${data.DailyForecasts[0].Day.Wind.Speed.Value} km/h`;
      const max = `${data.DailyForecasts[0].Temperature.Maximum.Value}℃`;
      const min = `${data.DailyForecasts[0].Temperature.Minimum.Value}℃`;
      const weatherData = { icon, weather, rain, wind, max, min };
      setCurrentWeather(weatherData);
    }
  }, [locationKey]);

  return (
    <div className="container">
      <GetCurrentLocation currentLocation={handleLocationInfo} />
      {currentWeather ? (
        <div className="display-board">
          <div className="location">
            <span className="location__flag">
              <i className="fas fa-map-marker-alt"></i> {currentLocation}
            </span>
          </div>
          <div className="weather">
            <div className="weather__main">
              <img
                src={`https://developer.accuweather.com/sites/default/files/${currentWeather.icon}-s.png`}
                alt="weather-icon"
              />
              <br />
              {currentWeather.weather}
            </div>
            <div className="weather__sub">
              <div>
                <i className="fas fa-temperature-low"></i> {currentWeather.min}/
                <i className="fas fa-temperature-high"></i> {currentWeather.max}
              </div>
              <div>
                {" "}
                <i className="fas fa-cloud-showers-heavy"></i>{" "}
                {currentWeather.rain}{" "}
              </div>
              <div>
                <i className="fas fa-wind"></i> {currentWeather.wind}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default GetCurrentWeather;
