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

class ScatterChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '13th October, 2017',
      data:[
          ['humidity'],
          ['humidity_x']
        ],
      color: props.initialColor
    };


    this.renderChart = this.renderChart.bind(this);
    this.getInitialValues = this.getInitialValues.bind(this);
  }
  renderChart = () =>{

    var chart = c3.generate({
      data: {
        // xs: {
        //     humidity: 'humidity_x',
        //     // setosa: 'setosa_x',
        // },
        // iris data from R
        columns: [
            this.state.data[0],
            this.state.data[1]
        ],
        // columns: [
        //     [50, 51, 50, 50, 48, 46, 51, 50, 48, 50, 48, 50, 48, 50, 47, 46, 45, 44, 46, 46, 46, 44, 45, 45, 46, 44, 44, 44, 44, 45],
        //     [ 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
        //   ],
        type: 'scatter'
      },
      axis: {
        x: {
            label: 'Sepal.Width',
            tick: {
                fit: false
            }
        },
        y: {
            label: 'Petal.Width'
        }
      }
    });
  }
  getInitialValues = () => {
    console.log('fetching');
    axios.get(`http://96.43.172.104:3000/points/${this.state.query}`)
      .then((response) => {
        var DataSet = response.data.data;

        var cleanedHour = DataSet.map((point)=>{
          return parseInt(dateFormat(point.createdAt, "H"));
        });

        var cleanedHumidity = DataSet.map((point)=>{
          return point.humidity;
        });
        // console.log(cleanedHumidity);
        var newData =this.state.data[0];
        var newHour =this.state.data[1];
        // newData.splice(0,0);
        newData.push(cleanedHumidity);
        // newHour.splice(0,0);
        newHour.push(cleanedHour);

        this.setState({
          data: [
              newData: cleanedHumidity,
              newHour: cleanedHour
            ]
        });
        console.log(this.state.data[0]);
        console.log(this.state.data[1]);
      })
      .catch(function (error) {
        console.log(error);
      });

  }
  componentWillMount(){
    this.getInitialValues();
  }
  componentDidMount(){
    this.renderChart();
  }
  render() {
    return (
    	<ScatterChart width={400} height={400} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
      	<XAxis dataKey={'x'} name='stature' unit='cm'/>
      	<YAxis dataKey={'y'} name='weight' unit='kg'/>
      	<CartesianGrid />
        <Scatter name='A school' data={data} fill='#8884d8'/>
      	<Tooltip cursor={{strokeDasharray: '3 3'}}/>
      </ScatterChart>
    );
  }
}

export default ScatterChart;
