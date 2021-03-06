import * as React from 'react';

import * as localforage from 'localforage';

import {CurrentWeather, ErrorMessage} from './components';
import './Weather.css'

export interface CurrentWeatherType {
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
  weather: CurrentWeatherType | null; 
  latitude: string | Promise<{}> | null;
  location: string;
  longitude: string | Promise<{}> | null;
  countryCode: string;
  unit: string;
  error: boolean | null;
}

export default class Weather extends React.Component<{}, State> {
  public readonly state = {
    countryCode: 'CA',
    error: null,
    latitude: localforage.getItem('latitude'),
    location: 'Ottawa',
    longitude: localforage.getItem('longitude'),
    unit: 'metric',
    weather: null,
  }

  public componentDidMount() {
    const { location: city, countryCode, unit, weather } = this.state;
    const API_KEY: string = process.env.REACT_APP_WEATHER_API_KEY || '';
    if (!weather) {
      this.fetchWeather(city, countryCode, unit, API_KEY);
    }
  }

  public render() {
    const { weather } = this.state;
    this.getCoords()
    console.log(this.state)
    const weatherCardMarkup = weather ? (
      <div className="mainContainer">
        <div className="location">
          <div className="leftAuth">
            <form onSubmit={this.submitNumber}>
              <label className='label'>Location:</label><br />
              <input
                className="locationInput"
                type="text"
                value={this.state.location || ''}
                onChange={this.handleChange}
              />
              <input className="submitButton" type="submit" value="Submit" />
            </form>
          </div>
        </div>
        <div className="weather">
          <CurrentWeather {...weather}/>
        </div>
      </div>
    ) : (
      <div className="mainContainer">
        <div className="weather">
          {this.state.error ? <ErrorMessage/> : <em>Weather loading</em>}
        </div>
      </div>
    );

    return weatherCardMarkup;
  }

  public handleChange = (event: any) => {
    this.setState({
      location: event.target.value,
    })
  }

  public submitNumber = (event: any) => {
    const { location: city, countryCode, unit } = this.state;
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY || ''
    event.preventDefault();
    this.setState({location: this.state.location})
    this.fetchWeather(city, countryCode, unit, API_KEY);
  }

  private getCoords = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function success(position:any) {
          localforage.setItem('latitude', position.coords.latitude)
          localforage.setItem('longitude', position.coords.longitude)
        },
        function error(errorMessage) {
          console.error('An error has occured while retrieving location', errorMessage)
          return null
        }  
      )
    }
  }

  private fetchWeather( city: string,countryCode: string, unit:string, apiKey:string):void {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&units=${unit}&appid=${apiKey}`)
    .then(res => {
        return res.json()
      })
    .catch(error => {
      console.log(error)
    })
    .then(json => { 
      // json = json.cod === 200 ? json : {"coord":{"lon":-0.13,"lat":51.51},"weather":[{"id":300,"main":"Drizzle","description":"light intensity drizzle","icon":"09d"}],"base":"stations","main":{"temp":28.32,"pressure":1012,"humidity":81,"temp_min":27.15,"temp_max":28.15},"visibility":10000,"wind":{"speed":4.1,"deg":80},"clouds":{"all":90},"dt":1485789600,"sys":{"type":1,"id":5091,"message":0.0103,"country":"GB","sunrise":1485762037,"sunset":1485794875},"id":2643743,"name":"London","cod":200}
      if(json.cod !== 200){
        this.setState({error: true})
      }
      const { name: city, 
              main: {humidity, temp: temperature, temp_max: high, temp_min: low}, 
              sys: { sunrise, sunset }, 
              weather: weatherArr
            } = json
      const { description, icon, main } = weatherArr[0]
      const weather: CurrentWeatherType = {
        city, description, high, humidity,icon,
        low, main, sunrise, sunset, temperature,
      }
      this.setState({weather})
    })
    .catch(error => {
      console.log(error)
    })

  } 
}
