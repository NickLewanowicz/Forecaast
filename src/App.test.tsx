import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

const globalAny:any = global;

class LocalStorageMock {
  public store = {}
  constructor() {
    this.store = {};
  }

  public clear() {
    this.store = {};
  }

  public getItem(key:any) {
    return this.store[key] || null;
  }

  public setItem(key:any, value:any) {
    this.store[key] = value.toString();
  }

  public removeItem(key:any) {
    delete this.store[key];
  }
};

globalAny.localStorage = new LocalStorageMock;

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
