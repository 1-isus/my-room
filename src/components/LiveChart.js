require('normalize.css/normalize.css');
require('styles/App.scss');
require('styles/Chart.scss');
// require('/../dist/static/c3.js');
// import Chart from 'c3js-react';
import c3 from './c3';
import d3 from './d3';
import 'c3/c3.css';
import io from 'socket.io-client';
let socket = io.connect(`http://96.43.172.104:1724`);
import axios from 'axios';
import React from 'react';
var dateFormat = require('dateformat');

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      data:[
        ['Temperature',],
        ['hour',]
      ],
      color: props.initialColor
    };

    socket.on('temperature', msg => {
      this.renderChart();

    });

    this.renderChart = this.renderChart.bind(this);
    this.getInitialValues = this.getInitialValues.bind(this);
  }
  renderChart = () =>{
    var chart = c3.generate({
      data: {
        xs: {
            Temperature: 'hour'
        },
        columns: [
            this.state.data[0],
            this.state.data[1],
        ],
        type: 'scatter',
        colors: {
            Temperature: '#e1a4a1',
        },
      },
      axis: {
        x: {
            label: 'Hour',
            tick: {
                fit: true
            }
        },
        y: {
            label: 'Temperature'
        }
      }
    });
  }
  getInitialValues = () => {

    var now = new Date();
    this.state.query = dateFormat(now, "dS mmmm, yyyy");
    axios.get(`http://96.43.172.104:3000/points/${this.state.query}`)
      .then((response) => {
        var DataSet = response.data.data;
        var newTemp =this.state.data[0];
        var newHour =this.state.data[1];

        // IDEA: add a notification system

        if (response.data.success == false) {
          console.log(response.data.msg);
        }

        for (var i=0; i<DataSet.length; i++) {
          var DataSet = response.data.data;
          var hour= parseInt(dateFormat(DataSet[i].createdAt, "HH"));
          newHour.push(hour);
        }
        for (var i=0; i<DataSet.length; i++) {
          var DataSet = response.data.data;
          var extractedTemp =  DataSet[i].temp;
          newTemp.push(extractedTemp);
        }

        this.setState({
          data: [
            newTemp,
            newHour
          ]
        });
      })
      .catch(function (error) {
        console.log(error);
      });

  }
  componentWillMount(){
    this.getInitialValues();
  }
  componentDidMount(){
  }
  render() {
    this.renderChart();
    return (
      <div className='col-md-12 col-sm-12 col-xs-12'>
        <div id="chart">
        </div>
      </div>
    );
  }
}

export default Chart;
