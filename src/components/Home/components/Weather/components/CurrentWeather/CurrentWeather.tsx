import * as React from 'react';

import * as dayjs from 'dayjs'
import { CurrentWeatherType } from '../../Weather'

export class CurrentWeather extends React.Component<CurrentWeatherType, {}> {
  public render() {
    const {city, description, temperature, high, low, icon, sunrise, sunset} = this.props;
    return (
      <div className='weatherCard'>
        <div className='temperature'><div className='currTemp'><img src={icon ? `https://openweathermap.org/img/w/${icon}.png` : ''} /> {temperature}°</div>
        <div className='highlow'>🔺{high}°🔻{low}°</div></div>
        <div className='sun'>🌅 {dayjs(sunrise*1000).format('h:mma')} <br/> 🌇 {dayjs(sunset*1000).format('h:mma')}</div>
        <div><em>Currently <span className='description'>{description}</span> in <span className='city'>{city}!</span> </em></div>
      </div>
    )
  }
}

export default CurrentWeather
