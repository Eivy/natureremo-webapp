/// <reference path="../schema.d.ts" />
import * as React from 'react';
import i18n from '../i18n';
import styles from './ButtonsAC.module.scss';
import Signal from './Signal';
import Button from './Button';

interface ACSettingProps {
  setting: RemoAPI.AirConParams,
  range: RemoAPI.AirConRangeMode,
  onChange?: (data: { temperature?: string, operation_mode?: string, air_volume?: string, air_direction?: string, button?: string }) => void,
}

const AirConSettings : React.FC<ACSettingProps> = React.memo((props) => {
  return (
    <div>
      {props.range.temp && props.range.temp.filter((v) => v !== '').length > 0 &&
        <select className={styles.temp} defaultValue={props.setting.temp} onChange={(event) => {if (props.onChange) props.onChange({temperature: event.target.value})}} >
          { props.range.temp!.map((v) => <option value={v} key={v}>{v}</option>) }
        </select>
      }
      {props.range.dir && props.range.dir.filter((v) => v !== '').length > 0 &&
        <select className={styles.dir} defaultValue={props.setting.dir} onChange={(event) => {if (props.onChange) props.onChange({air_direction: event.target.value})}} >
          { props.range.dir!.map((v) => <option value={v} key={v}>{v}</option>) }
        </select>
      }
      {props.range.vol && props.range.vol.filter((v) => v !== '').length > 0 &&
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
        <div className={styles.mode}>
          <Button className={props.appliance.settings!.button === 'power-off' ? styles.on: ''} button={{name: i18n.t('power'), image: '', label: i18n.t('OFF')}} onClick={(event) => {if (props.onChange) props.onChange({button: 'power-off'})}} />
          { Object.keys(props.appliance.aircon!.range!.modes!).map((v) => (
            <Button
              key={v}
              className={ props.appliance.settings!.button === '' && props.appliance.settings!.mode === v ? styles.on: ''}
              button={{name: i18n.t(v), image: 'ico_ac_' + v, label: i18n.t(v)}}
              onClick={(event) => {if(props.onChange) props.onChange({operation_mode: v})}}
            >{v}</Button>)
          )}
        </div>
        <div className={styles.settings}>
          {
            props.appliance.settings && (props.appliance.aircon!.range!.modes! as any)[props.appliance.settings!.mode!] &&
            <AirConSettings setting={props.appliance.settings!} range={(props.appliance.aircon!.range!.modes! as any)[props.appliance.settings!.mode!]} onChange={props.onChange!} />
          }
        </div>
      </div>
      <div className={styles.signals} >
        {
          props.appliance.signals!.map((v: RemoAPI.Signal, i: number) => (
            <Signal
              key={i}
              signal={v}
              onClick={props.onSignalClick ? (event) => {props.onSignalClick!(v)} : (event) => {}}
            />)
          )
        }
      </div>
    </div>
  )
});

export default ButtonsAC;
