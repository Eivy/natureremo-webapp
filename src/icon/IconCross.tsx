import * as React from 'react';

class IconCross extends React.Component {

  render() {
    return (
      <svg className="icon fill" viewBox="0 0 200 200">
        <g transform="rotate(45,100,100)">
          <rect x="90" y="30" width="20" height="140" />
          <rect x="30" y="90" width="140" height="20" />
        </g>
        ❌
      </svg>
    )
  }

}

export default IconCross;
