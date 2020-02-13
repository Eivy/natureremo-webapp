import React from 'react';
import './App.scss';
import './Icons.scss';
import * as Icons from './Icons'

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Icons.AirCon1 />
        <Icons.AirCon2 />
        <Icons.TV />
        <Icons.Light />
        <Icons.AV />
        <Icons.Fan />
        <Icons.Vacuum />
        <Icons.Audio />
        <Icons.Curtain />
        <Icons.AirPurifier />
        <Icons.Etc />
        <Icons.Power />
        <Icons.Power on={true} />
        <Icons.Power on={false} />
        <Icons.Minus />
        <Icons.Plus />
        <Icons.Cross />
        <Icons.Check />
        <Icons.Play />
        <Icons.FF />
        <Icons.EFF />
        <Icons.Rewind />
        <Icons.ERewind />
        <Icons.Pause />
        <Icons.Stop />
        <Icons.Record />
        <Icons.Text value="0" />
        <Icons.Text value="1" />
        <Icons.Text value="2" />
        <Icons.Text value="3" />
        <Icons.Text value="4" />
        <Icons.Text value="5" />
        <Icons.Text value="6" />
        <Icons.Text value="7" />
        <Icons.Text value="8" />
        <Icons.Text value="9" />
        <Icons.Text value="10" />
        <Icons.Text value="11" />
        <Icons.Text value="12" />
        <Icons.Text value="CLOSE" />
        <Icons.Text value="OPEN" />
        <Icons.Text value="STOP" />
        <Icons.Text value="ON" />
        <Icons.Text value="OFF" />
      </header>
    </div>
  );
}

export default App;
