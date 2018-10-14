import * as React from 'react';
import './Weather.css'

interface CurrentWeather {
  city: string;
  high: number;
  low: number;
  temperature: number;
  sunrise: number;
  sunset: number;
  humidity: number;
  description: string;
  icon: string;
  main: string;
}

interface State {
  weather: CurrentWeather | null; 
}

export default class Weather extends React.Component<{}, State> {
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
            .then(json => { 
                const { name: city, main: {humidity, temp: temperature, temp_max: high, temp_min: low}, sys: { sunrise, sunset }, weather:weatherArr } = json
                const { description, icon, main } = weatherArr[0]
                const weather: CurrentWeather = {
                  city,
                  description,
                  high,
                  humidity,
                  icon,
                  low,
                  main,
                  sunrise,
                  sunset,
                  temperature,
                }
                this.setState({weather})
             });

  } 
}
