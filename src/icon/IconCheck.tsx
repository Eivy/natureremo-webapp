import * as React from 'react';

class IconCheck extends React.Component {

  render() {
    return (
      <svg className="icon fill" viewBox="0 0 200 200">
        <g transform="rotate(45,100,100)">
          <rect x="60" y="140" width="40" height="20" />
          <rect x="100" y="40" width="20" height="120" />
        </g>
        ✅
      </svg>
    )
  }

}

export default IconCheck;
