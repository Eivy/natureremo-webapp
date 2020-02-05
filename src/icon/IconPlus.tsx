import * as React from 'react';

class IconPlus extends React.Component {

  render() {
    return (
      <svg className="icon fill" viewBox="0 0 200 200">
        <rect x="90" y="30" width="20" height="140" />
        <rect x="30" y="90" width="140" height="20" />
        +
      </svg>
    )
  }

}

export default IconPlus;
