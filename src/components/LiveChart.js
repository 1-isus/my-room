require('normalize.css/normalize.css');
require('styles/App.scss');
require('styles/Chart.scss');
import axios from 'axios';
import React from 'react';
import io from 'socket.io-client';
import c3 from './c3';
import d3 from './d3';
import 'c3/c3.css';
var moment = require('moment');

let socket = io.connect(`http://96.43.172.104:1724`);
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
      var now = new Date();
      var newTemp =this.state.data[0];
      var newHour =this.state.data[1];
      newTemp.push(msg.point.temp.toFixed(1));
      newHour.push(dateFormat(now, "HH"));
      this.setState({
        data: [
          newTemp,
          newHour
        ]
      });
      this.renderChart();
    });
    /*
    *define functions to be used.
    */
    this.renderChart = this.renderChart.bind(this);
    this.getInitialValues = this.getInitialValues.bind(this);
  }
  /*
  *creates the render function to be called after data is available.
  */
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
      zoom: {
        enabled: true
      },
      axis: {
        x: {
            label: '24 Hour',
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
  /*
  *make call to api to get all the previoud data/data for a specific date.
  */
  getInitialValues = () => {

    var now = new Date();
    this.state.query = dateFormat(now, "mmmm d, yyyy");
    axios.get(`http://96.43.172.104:3000/points/${this.state.query}`)
    // axios.get(`http://96.43.172.104:3000/points`)
      .then((response) => {
        var DataSet = response.data.data;
        var newTemp =this.state.data[0];
        var newHour =this.state.data[1];

        // IDEA: add a notification system

        if (response.data.success == false) {
          console.log(response.data.msg);
        }
        // console.log(response.data);
        /*
        *data is being fomatted note same result can be achived using the .map() function.
        */
        for (var i=0; i<DataSet.length; i++) {
          var DataSet = response.data.data;
          var hour = moment.unix(DataSet[i].createdAt).format("H");
          newHour.push(hour);
        }
        for (var i=0; i<DataSet.length; i++) {
          var DataSet = response.data.data;
          var extractedTemp =  DataSet[i].temp;
          newTemp.push(extractedTemp.toFixed(1));
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
      /*
      *call the render function after data is recieved.
      */
      this.renderChart();
  }
  componentWillMount(){
    /*
    *call the getInitialValues fumction which then calls the render chart function.
    */
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
