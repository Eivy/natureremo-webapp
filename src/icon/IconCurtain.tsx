import * as React from 'react';

class IconCurtain extends React.Component {
  render() {
    return (
      <svg className="icon curtain" viewBox="0 0 200 200">
        <path d="
        M 10,10 h180 z
        M 10,10 v140 a 20 20 1 1 0 40,0 v-140
        M 50,10 v140 a 20 20 1 1 0 40,0 v-140
        M 90,150 h20
        M 110,10 v140 a 20 20 1 1 0 40,0 v-140
        M 150,10 v140 a 20 20 1 1 0 40,0 v-140
        " />
      </svg>
    );
  }
}

export default IconCurtain;
