import * as React from 'react';

class IconVacuum extends React.Component {
  render() {
    return (
      <svg className="icon vacuum" viewBox="0 0 200 200">
        <circle r="80" cx="100" cy="100" />
        <path d="M35,100 A60 60 1 0 1 165,100" />
        <circle r="50" cx="100" cy="100" />
        <circle r="25" cx="100" cy="100" />
      </svg>
    );
  }
}

export default IconVacuum;
