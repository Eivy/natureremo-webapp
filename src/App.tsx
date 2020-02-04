import React from 'react';
import './App.scss';
import './icon/Icon.scss';
import IconPower from './icon/IconPower';
import IconAV from './icon/IconAV';
import IconAirCon1 from './icon/IconAirCon1';
import IconAirCon2 from './icon/IconAirCon2';
import IconAirPurifier from './icon/IconAirPurifier';
import IconAudio from './icon/IconAudio';
import IconCurtain from './icon/IconCurtain';
import IconEtc from './icon/IconEtc';
import IconFan from './icon/IconFan';
import IconLight from './icon/IconLight';
import IconTV from './icon/IconTV';
import IconVacuum from './icon/IconVacuum';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <IconPower />
        <IconPower on />
        <IconAirCon1 />
        <IconAirCon2 />
        <IconTV />
        <IconLight />
        <IconAV />
        <IconFan />
        <IconVacuum />
        <IconAudio />
        <IconCurtain />
        <IconAirPurifier />
        <IconEtc />
      </header>
    </div>
  );
}

export default App;
