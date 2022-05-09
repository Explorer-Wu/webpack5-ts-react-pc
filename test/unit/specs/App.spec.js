import React from 'react';
import ReactDOM from 'react-dom';
import App from '@@App';
// import HelloWorld from '@@components/HelloWorld';

describe('App.js', () => {
  // it('should render correct contents', () => {
  //   const Constructor = Vue.extend(HelloWorld);
  //   const vm = new Constructor().$mount();
  //   expect(vm.$el.querySelector('.hello h1').textContent)
  //     .toEqual('Welcome to Your Vue.js App');
  // });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});