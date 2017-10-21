require('normalize.css/normalize.css');
require('styles/App.scss');
require('styles/Chart.scss');
import React from 'react';
var dateFormat = require('dateformat');
var unix = require('to-unix-timestamp');
import Chart from './LiveChart.js';
import io from 'socket.io-client';
import c3 from './c3';
import d3 from './d3';
import 'c3/c3.css';

let socket = io(`http://96.43.172.104:1724`)

class Temp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: "--",
      humid: "--",
      showTempChart: true,
      buttonText: "Show Chart"
    };

    /** listen for data from socket */

    socket.on('temperature', msg => {
      var now = new Date();
      var newTemp = msg.point.temp;
      var newHumidity = msg.point.humidity;
      this.setState({
        date: dateFormat(now, "dddd mmmm dS, yyyy"),
        temp: newTemp,
        humid: newHumidity
      });
    });
    this.showChart = this.showChart.bind(this);
  }

  /** call function when show chart/ hide chart button is pressed. */
  showChart=()=>{
    console.log(unix(new Date()));
    this.setState({
      showTempChart: !this.state.showTempChart
    });
    if (this.state.showTempChart) {
      this.state.buttonText = "Hide Chart"
    } else {
      this.state.buttonText = "Show Chart"
    }
  };
  getInitialValues = () => {

  }
  render() {
    return (
      <div>
        <div className="display col-md-12 col-xs-12 col-sm-12">
          <div className="label col-md-12 col-xs-12 col-sm-12">
            <p className="text-center">{this.state.date}</p>
          </div>
          <div className="temp col-md-12 col-xs-12 col-sm-12">
            <p className="text-center">{this.state.temp}&#8451;</p>
          </div>
          <div className="humidity col-md-12 col-xs-12 col-sm-12">
            <p className="text-center">{this.state.humid}% humidity</p>
          </div>
          <div className="chartContainer clearfix col-md-12 col-xs-12 col-sm-12">
            <If condition={!this.state.showTempChart}>
              <Chart/>
            </If>
            <input type="button" onClick={() => this.showChart()} value={this.state.buttonText}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Temp;
