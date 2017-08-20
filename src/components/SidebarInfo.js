require('normalize.css/normalize.css');
require('styles/App.scss');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import React from 'react';
class SidebarInfo extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className='col-md-12 col-xs-12 col-sm-12'>
          <div className='row'>
            <div className='col-xs-8 col-sm-8 col-md-8'>
              <p>{this.props.name}</p>
            </div>
            <div className='col-xs-4 col-sm-4 col-md-4'>
              <p className='text-right'>{this.props.value} {this.props.unit}  </p>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default SidebarInfo;
