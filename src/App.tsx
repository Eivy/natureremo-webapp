import React from 'react';
import './App.scss';
import './Icons.scss';
import {
IconPower,
IconAV,
IconAirCon1,
IconAirCon2,
IconAirPurifier,
IconAudio,
IconCurtain,
IconEtc,
IconFan,
IconLight,
IconTV,
IconVacuum,
IconText,
IconMinus,
IconPlus,
IconCross,
IconCheck,
IconPlay,
IconPause,
IconStop,
IconRecord,
IconFF,
IconEFF,
IconRewind,
IconERewind,
} from './Icons'

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
        <IconPower on={true} />
        <IconPower on={false} />
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
