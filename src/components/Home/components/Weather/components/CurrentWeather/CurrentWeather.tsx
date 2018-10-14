import * as React from 'react';
import { CurrentWeatherType } from '../../Weather'


export class CurrentWeather extends React.Component<CurrentWeatherType, {}> {
  public render() {
    const {city} = this.props;
    return (
      <div>
        <div><em>Your Weather is:</em></div>
        {city}
      </div>
    )
  }
}

export default CurrentWeather
