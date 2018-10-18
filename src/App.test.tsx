import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

const globalAny:any = global;

class LocalStorageMock {
  public store = {}
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key:any) {
    return this.store[key] || null;
  }

  setItem(key:any, value:any) {
    this.store[key] = value.toString();
  }

  removeItem(key:any) {
    delete this.store[key];
  }
};

globalAny.localStorage = new LocalStorageMock;

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
