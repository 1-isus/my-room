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
class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[
          ['data1',],
          [ 'x',]
        ],
      color: props.initialColor
    };

    socket.on('temperature', msg => {
      var newData = this.state.data[0];
      var newTime = this.state.data[1];
      if(newData.length < 61 ) {
        newData.push(msg.point);
        newTime.push(msg.timeStamp);

      } else {
        newData.splice(1,1);
        newData.push(msg.point);
        newTime.splice(1,1);
        newTime.push(msg.timeStamp);
      }

      this.setState({
        data: [
            newData,
            newTime
          ]
      });
      console.log(this.state.data);
      this.renderChart();
    });

    this.renderChart = this.renderChart.bind(this);
    this.getInitialValues = this.getInitialValues.bind(this);
  }
  renderChart = () =>{
    var chart = c3.generate({
      bindto: '#chart',
      data: {
        x : 'x',
        columns: [
          this.state.data[0],
          this.state.data[1]
        ],
        type: 'area',
      },
      axis: {
        x: {
          type: 'category',
          tick: {
            count: 10,
          }
        }
      },
      colors: {
        data1: '#669177'
      }
    });
  }
  getInitialValues = () => {

  }
  componentWillMount(){
    this.getInitialValues();
  }
  componentDidMount(){
    this.renderChart();
  }
  render() {
    return (
      <div className='col-md-12 col-sm-12 col-xs-12'>
        <div id="chart">
        </div>
      </div>
    );
  }
}

export default Chart;
