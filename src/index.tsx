import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as localforage from 'localforage';

import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

localforage.config({
  description : 'Forecaast IndexDB used to store all location/weather data',
  driver      : localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
  name        : 'forecaast',
  size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
  storeName   : 'weatherData', // Should be alphanumeric, with underscores.
  version     : 1.0
});

localforage.ready().then(()=> {
  ReactDOM.render(
    <App />,
    document.getElementById('root') as HTMLElement
  );
  registerServiceWorker();
  console.log(localforage.driver()); // LocalStorage
}).catch((e) => {
  console.log(e); // `No available storage method found.`
});


