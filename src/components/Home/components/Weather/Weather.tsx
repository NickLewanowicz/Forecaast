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
    if(this.state && this.state.weather){
      const {weather} = this.state;
      if(weather){
        return (
          <div className="mainContainer">
            <div className="weather">
              <div><em>Your Weather is:</em></div>
              {weather.city}
            </div>
          </div>
        )
      }
    }
    this.fetchWeather(city, countryCode, unit, API_KEY);
    return (
      <div className="mainContainer">
      <div className="weather">
        <em>Weather loading</em>
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
        json = json.cod === 200 ? json : {"coord":{"lon":-0.13,"lat":51.51},"weather":[{"id":300,"main":"Drizzle","description":"light intensity drizzle","icon":"09d"}],"base":"stations","main":{"temp":280.32,"pressure":1012,"humidity":81,"temp_min":279.15,"temp_max":281.15},"visibility":10000,"wind":{"speed":4.1,"deg":80},"clouds":{"all":90},"dt":1485789600,"sys":{"type":1,"id":5091,"message":0.0103,"country":"GB","sunrise":1485762037,"sunset":1485794875},"id":2643743,"name":"London","cod":200}
        const { name: city, 
                main: {humidity, temp: temperature, temp_max: high, temp_min: low}, 
                sys: { sunrise, sunset }, 
                weather: weatherArr
              } = json
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
        console.log(weather)
        this.setState({weather})
      });

  } 
}
