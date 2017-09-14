require('normalize.css/normalize.css');
require('styles/App.scss');

// import Chart from './LiveChart.js';
import Temp from './Temp.js';
import React from 'react';

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <div className="clearfix">
          <Temp />
        </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
