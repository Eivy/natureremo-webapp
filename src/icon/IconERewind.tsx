import * as React from 'react';

class IconERewind extends React.Component {

  render() {
    return (
      <svg className="icon fill" viewBox="0 0 200 200">
        <g transform="rotate(180,100,100)">
          <path d="
          M 40,60 l60,40 l-60,40 z
          M 100,60 l60,40 l-60,40 z
          " />
          <rect x="160" y="60" height="80" width="10" />
        </g>
        ⏮
      </svg>
    )
  }

}

export default IconERewind;
