import * as enzyme from 'enzyme';
import ReactAdapter from 'enzyme-adapter-react-16';
// import React from 'react';
// React.config.productionTip = false;

enzyme.configure({ adapter: new ReactAdapter() });