/// <reference path="../schema.d.ts" />
import * as React from 'react';
import styles from './ButtonsAC.module.scss';
import Signal from './Signal';

interface ACSettingProps {
  setting: RemoAPI.AirConParams,
  range: RemoAPI.AirConRangeMode,
  onChange?: (data: { temperature?: string, operation_mode?: string, air_volume?: string, air_direction?: string, button?: string }) => void,
}

const AirConSettings : React.FC<ACSettingProps> = React.memo((props) => {
  return (
    <div>
      { props.range.temp &&
        <select className={styles.temp} defaultValue={props.setting.temp} onChange={(event) => {if (props.onChange) props.onChange({temperature: event.target.value})}} >
          { props.range.temp!.map((v) => <option value={v} key={v}>{v}</option>) }
        </select>
      }
      { props.range.dir &&
        <select className={styles.dir} defaultValue={props.setting.dir} onChange={(event) => {if (props.onChange) props.onChange({air_direction: event.target.value})}} >
          { props.range.dir!.map((v) => <option value={v} key={v}>{v}</option>) }
        </select>
      }
      {props.range.vol &&
        <select className={styles.vol} defaultValue={props.setting.vol} onChange={(event) => {if (props.onChange) props.onChange({air_volume: event.target.value})}} >
          { props.range.vol!.map((v) => <option value={v} key={v}>{v}</option>) }
        </select>
      }
    </div>
  );
});

interface Props {
  appliance: RemoAPI.Appliance,
  onChange?: (data: { temperature?: string, operation_mode?: string, air_volume?: string, air_direction?: string, button?: string }) => void,
  onSignalClick?: (button: RemoAPI.Signal) => void,
}

const ButtonsAC : React.FC<Props> = React.memo((props) => {
  if (props.appliance.type !== "AC") {
    return <div>Wrong appliance!!</div>;
  }
  return (
    <div className={styles.buttons_ac} >
      <div className={styles.buttons} >
        <label className={styles.button_power}>
          <input type="checkbox" defaultChecked={props.appliance.settings!.button !== 'power-off'} onChange={(event) => {if (props.onChange) props.onChange({button: event.target.checked ? '' : 'power-off'})}} />
          <span>ON</span><span>OFF</span>
        </label>
        <select className={styles.mode} defaultValue={props.appliance.settings!.mode} onChange={(event) => {if (props.onChange) props.onChange({operation_mode: event.target.value})}} >
          { Object.keys(props.appliance.aircon!.range!.modes!).map((v) => <option value={v} key={v}>{v}</option>) }
        </select>
        { props.appliance.aircon!.range!.modes!.auto && props.appliance.settings!.mode === 'auto' &&  <AirConSettings setting={props.appliance.settings!} range={props.appliance.aircon!.range!.modes!.auto} onChange={props.onChange!} />}
        { props.appliance.aircon!.range!.modes!.warm && props.appliance.settings!.mode === 'warm' && <AirConSettings setting={props.appliance.settings!} range={props.appliance.aircon!.range!.modes!.warm} onChange={props.onChange!} />}
        { props.appliance.aircon!.range!.modes!.cool && props.appliance.settings!.mode === 'cool' && <AirConSettings setting={props.appliance.settings!} range={props.appliance.aircon!.range!.modes!.cool} onChange={props.onChange!} />}
        { props.appliance.aircon!.range!.modes!.blow && props.appliance.settings!.mode === 'blow' && <AirConSettings setting={props.appliance.settings!} range={props.appliance.aircon!.range!.modes!.blow} onChange={props.onChange!} />}
        { props.appliance.aircon!.range!.modes!.dry && props.appliance.settings!.mode === 'dry' && <AirConSettings setting={props.appliance.settings!} range={props.appliance.aircon!.range!.modes!.dry} onChange={props.onChange!} />}
      </div>
      <div className={styles.signals} >
        { props.appliance.signals!.map((v: RemoAPI.Signal, i: number) => <Signal key={i} signal={v} onClick={props.onSignalClick ? (event) => {props.onSignalClick!(v)} : (event) => {}} />) }
      </div>
    </div>
  )
});

export default ButtonsAC;
