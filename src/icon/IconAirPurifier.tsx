import * as React from 'react';

class IconAirPurifier extends React.Component {
  render() {
    return (
      <svg className="icon airpurifier" viewBox="0 0 200 200">
        <rect x="50" y="30" height="140" width="100" rx="10" ry="10" />
        <circle r="10" cx="100" cy="60" />
        <path d="
        M 65,130 h70
        M 65,140 h70
        M 65,150 h70
        " />
      </svg>
    );
  }
}

export default IconAirPurifier;
