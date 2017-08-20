require('normalize.css/normalize.css');
require('styles/App.scss');


import Chart from './LiveChart.js';
import Header from './Header.js';
import Sidebar from './Sidebar';
import React from 'react';

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <div className="col-md-12 col-xs-12 col-sm-12">
          <div className="clearfix">
          <div className="row">
            <div>
              <Header />
            </div>
            <div className="col-md-2 col-xs-2 col-sm-2">
              <Sidebar />
            </div>
            <div className="col-md-10 col-xs-10 col-sm-10">
              <Chart />
            </div>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
