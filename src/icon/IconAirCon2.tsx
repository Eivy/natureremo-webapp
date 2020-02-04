import * as React from 'react';

class IconAirCon2 extends React.Component {
  render() {
    return (
      <svg className="icon av" viewBox="0 0 200 200">
        <rect x="20" y="50" height="100" width="160" rx="5" ry="5" />
        <rect x="40" y="85" height="30" width="10" rx="5" ry="5" />
        <circle r="5" cx="45" cy="130" />
        <rect x="60" y="85" height="50" width="100" rx="5" ry="5" />
        <path d="
        M 40,65 h50 m 20,0 h50
        M 60,97.5 h100
        M 60,110 h100
        M 60,122.5 h100
        M 40,150 v10
        M 160,150 v10
        " />
      </svg>
    );
  }
}

export default IconAirCon2;
