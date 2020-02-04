import * as React from 'react';

class IconEtc extends React.Component {
  render() {
    return (
      <svg className="icon etc" viewBox="0 0 200 200">
        <rect x="40" y="70" height="60" width="120" rx="10" ry="10" />
        <rect x="70" y="80" height="40" width="60" rx="10" ry="10" />
        <path d="
        M 90 90 v20
        M 110 90 v20
        "/>
      </svg>
    );
  }
}

export default IconEtc;
