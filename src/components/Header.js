require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <p className="text-left">
          iFarm
        </p>
      </div>
    );
  }
}

export default Header;
