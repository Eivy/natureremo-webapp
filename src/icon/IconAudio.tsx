import * as React from 'react';

class IconAudio extends React.Component {
  render() {
    return (
      <svg className="icon audio" viewBox="0 0 200 200">
        <rect x="60" y="40" height="120" width="80" rx="10" ry="10" />
        <circle r="15" cx="100" cy="70" />
        <circle r="2.5" cx="100" cy="70" />
        <circle r="20" cx="100" cy="125" />
        <circle r="10" cx="100" cy="125" />
      </svg>
    );
  }
}

export default IconAudio;
