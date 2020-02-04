import * as React from 'react';

class IconLight extends React.Component {
  render() {
    return (
      <svg className="icon light" viewBox="0 0 200 200">
        <path d="
        M 70,35 h60 v10 a5 5 1 0 1 -5,5 h-50 a5 5 1 0 1 -5,-5 v-10 z
        M 80,50 a20 20 1 0 0 40,0
        M 100,70 v90
        M 80,170 h40 v-5 a5 5 1 0 0 -5,-5 h-30 a 5 5 1 0 0 -5,5 v5 z
        " />
      </svg>
    );
  }
}

export default IconLight;
