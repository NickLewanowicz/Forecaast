import * as React from 'react';
import { CurrentWeatherType } from '../../Weather'


export class CurrentWeather extends React.Component<CurrentWeatherType, {}> {
  public render() {
    const {city, description, temperature, high, low, icon} = this.props;
    return (
      <div className='weatherCard'>
        <div className='temperature'><div className='currTemp'><img src={icon ? `https://openweathermap.org/img/w/${icon}.png` : ''} /> {temperature}°</div>
        <div className='highlow'>🔺{high}°🔻{low}°</div></div>
        
        <div className='sun'>🌅 SR Time / 🌇 SS Time</div>
        <div><em>Currently <span className='description'>{description}</span> in <span className='city'>{city}!</span> </em></div>
        

      </div>
    )
  }
}

export default CurrentWeather
