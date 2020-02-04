import * as React from 'react';

class IconFan extends React.Component {
  render() {
    return (
      <svg className="icon fan" viewBox="0 0 200 200">
        <circle r="40" cx="100" cy="80" />
        <circle r="5" cx="100" cy="80" />
        <path d="
        M 105,77 a 17 17 1 0 0 -5,-29
        M 95,77 a 17 17 1 0 0 -19,25
        M 100,85 a 17 17 1 0 0 28,12
        M 90,120 v30
        M 110,120 v30
        M 80,160 h40 v-5 a5 5 1 0 0 -5,-5 h-30 a 5 5 1 0 0 -5,5 v5 z
        " />
      </svg>
    );
  }
}

export default IconFan;
