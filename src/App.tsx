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
import IconText from './icon/IconText';
import IconMinus from './icon/IconMinus';
import IconPlus from './icon/IconPlus';
import IconCross from './icon/IconCross';
import IconCheck from './icon/IconCheck';
import IconPlay from './icon/IconPlay';
import IconPause from './icon/IconPause';
import IconStop from './icon/IconStop';
import IconRecord from './icon/IconRecord';
import IconFF from './icon/IconFF';
import IconEFF from './icon/IconEFF';
import IconRewind from './icon/IconRewind';
import IconERewind from './icon/IconERewind';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
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
        <IconPower />
        <IconPower on />
        <IconMinus />
        <IconPlus />
        <IconCross />
        <IconCheck />
        <IconPlay />
        <IconFF />
        <IconEFF />
        <IconRewind />
        <IconERewind />
        <IconPause />
        <IconStop />
        <IconRecord />
        <IconText value="0" />
        <IconText value="1" />
        <IconText value="2" />
        <IconText value="3" />
        <IconText value="4" />
        <IconText value="5" />
        <IconText value="6" />
        <IconText value="7" />
        <IconText value="8" />
        <IconText value="9" />
        <IconText value="10" />
        <IconText value="11" />
        <IconText value="12" />
        <IconText value="CLOSE" />
        <IconText value="OPEN" />
        <IconText value="STOP" />
        <IconText value="ON" />
        <IconText value="OFF" />
      </header>
    </div>
  );
}

export default App;
