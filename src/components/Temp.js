require('normalize.css/normalize.css');
require('styles/App.scss');
require('styles/Chart.scss');
// require('/../dist/static/c3.js');
// import Chart from 'c3js-react';
import Chart from './LiveChart.js';
import c3 from './c3';
import d3 from './d3';
import 'c3/c3.css';
import io from 'socket.io-client'
let socket = io(`http://96.43.172.104:1724`)

import React from 'react';
class Temp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: 27,
      humid: 50
    };

    socket.on('temperature', msg => {
      // console.log(msg.point);
      var newTemp = msg.point.temp;
      var newHumidity = msg.point.humidity;
      this.setState({
        temp: newTemp,
        humid: newHumidity
      });
    });
  }
  getInitialValues = () => {

  }
  render() {
    return (
      <div>
        <div className="display col-md-12 col-xs-12 col-sm-12">
          <div className="label col-md-12 col-xs-12 col-sm-12">
            <p className="text-center">le room</p>
          </div>
          <div className="temp col-md-12 col-xs-12 col-sm-12">
            <p className="text-center">{this.state.temp}&deg;C</p>
          </div>
          <div className="humidity col-md-12 col-xs-12 col-sm-12">
            <p className="text-center">{this.state.humid}% humidity</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Temp;
