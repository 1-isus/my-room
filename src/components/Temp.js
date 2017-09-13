require('normalize.css/normalize.css');
require('styles/App.scss');
require('styles/Chart.scss');
// require('/../dist/static/c3.js');
// import Chart from 'c3js-react';
import c3 from './c3';
import d3 from './d3';
import 'c3/c3.css';
import io from 'socket.io-client'
let socket = io(`http://localhost:1724`)

import React from 'react';
class Temp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: 27
    };

    socket.on('temperature', msg => {
      console.log(msg.point);
      var newTemp = msg.point;
      this.setState({
        temp: newTemp
      });
    });
  }
  getInitialValues = () => {

  }
  render() {
    return (
      <div className="temp col-md-12 col-xs-12 col-sm-12">
        <p className="text-center">{this.state.temp}&deg;c</p>
      </div>
    );
  }
}

export default Temp;
