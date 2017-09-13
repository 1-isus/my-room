require('normalize.css/normalize.css');
require('styles/App.scss');

import Chart from './LiveChart.js';
import React from 'react';

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <div className="clearfix">
          <div className="temp col-md-12 col-xs-12 col-sm-12">
              <p className="text-center">30.5&deg;c</p>
            </div>
          </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
