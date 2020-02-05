import * as React from 'react';

class IconRewind extends React.Component {

  render() {
    return (
      <svg className="icon fill" viewBox="0 0 200 200">
        <g transform="rotate(180, 100, 100)">
          <path d="
          M 40,60 l60,40 l-60,40 z
          M 100,60 l60,40 l-60,40 z
          " />
        </g>
        ⏪
      </svg>
    )
  }

}

export default IconRewind;
