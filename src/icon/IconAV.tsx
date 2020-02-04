import * as React from 'react';

class IconAV extends React.Component {
  render() {
    return (
      <svg className="icon av" viewBox="0 0 200 200">
        <rect x="20" y="70" height="60" width="160" rx="5" ry="5" />
        <rect x="40" y="80" height="20" width="80" rx="5" ry="5" />
        <circle r="15" cx="150" cy="100" />
        <path d="M 40,115 h10 m 10,0 h10 m10,0 h10" />
      </svg>
    );
  }
}

export default IconAV;
