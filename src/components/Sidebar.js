require('normalize.css/normalize.css');
require('styles/App.scss');
import SidebarInfo from './SidebarInfo'
import React from 'react';
class Sidebar extends React.Component {
  render() {
    return (
      <div className='sidebar'>
          <div className='each'>
            <SidebarInfo name='Chlorine' value='3.2' unit='PPM' />
          </div>
          <div className='each'>
            <SidebarInfo name='Chlorine Concentration' value='3.2' unit='PPM' />
          </div>
          <div className='each'>
            <SidebarInfo name='Water line (Main Valve)' value='On' />
          </div>
      </div>
    );
  }
}

export default Sidebar;
