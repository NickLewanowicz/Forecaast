import * as React from 'react';
import './Weather.css'

export default class Weather extends React.Component {
  public render() {
    const countryCode: string = 'CA'
    const city: string = 'Ottawa'
    const unit: string = 'metric'
    const API_KEY: string = process.env.REACT_APP_WEATHER_API_KEY || '';
    this.fetchWeather(city, countryCode, unit, API_KEY);
    return (
      <div className="mainContainer">
        <div className="weather">
          <em>Your Weather is:</em>
          
        </div>
      </div>
    )
  }
  private fetchWeather( city: string,countryCode: string, unit:string, apiKey:string):void {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&units=${unit}&appid=${apiKey}`)
            .then(res => {
                console.log(res);
                return res.json()
             })
            .then(weather => { 
                console.log(weather); 
             });

  } 
}
