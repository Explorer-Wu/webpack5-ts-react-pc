// /*--- React 16 使用 core-js 支持老版本浏览器 ---*/
// import 'core-js/es';
// import 'core-js/es/map';
// import 'core-js/es/set';
// import 'core-js/es/promise';

// import * as React from 'react';
import * as ReactDOM from 'react-dom';

/*-- 使用 raf 的 package 增添 requestAnimationFrame 的 shim --*/
import "raf/polyfill";

import App from "./App";
// import * as serviceWorker from './serviceWorker';

if (module && module.hot) {
  module.hot.accept();
}

ReactDOM.render(<App />,
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  document.getElementById("root") as HTMLElement
);



