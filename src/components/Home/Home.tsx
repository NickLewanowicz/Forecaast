import * as React from 'react';
import {Weather} from './components';
import './Home.css'

export class Home extends React.Component {
  public render() {
    return (
      <div>
        <Weather/>
      </div>
    )
  }
}

export default Home
