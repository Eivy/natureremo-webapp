/// <reference path="../schema.d.ts" />
import * as React from 'react';
import i18n from '../i18n';
import styles from './ButtonsAC.module.scss';
import Signal from './Signal';
import Button from './Button';

interface IAirConSettings {
  temperature?: string,
  operation_mode?: string,
  air_volume?: string,
  air_direction?: string,
  button?: string,
};

interface ACSettingProps {
  setting: RemoAPI.AirConParams,
  range: RemoAPI.AirConRangeMode,
  onChange?: (data: RemoAPI.AirConParams) => void,
}

const AirConSettings : React.FC<ACSettingProps> = React.memo((props) => {
  const target: {[key: string]: (v: string) => IAirConSettings} = {
    'vol': (v: string): IAirConSettings => { return {air_volume: v}; },
    'dir': (v: string): IAirConSettings => { return {air_direction: v}; },
    'temp': (v: string): IAirConSettings => { return {temperature: v}; },
  };
  return (
    <div>
      {
        Object.keys(props.range).map((range) => (
          (props.range as any)[range].filter((v: string) => v !== '').length > 0 &&
          <label key={range} >
            { i18n.t(range) }:
            <select
              className={range}
              defaultValue={(props.setting as any)[range]}
              onChange={(event) => {if (props.onChange) props.onChange(target[range](event.target.value as string))}}
            >
              { (props.range as any)[range].map((v: string) => <option value={v} key={v}>{v}</option>) }
            </select>
          </label>
        ))
      }
    </div>
  );
});

interface Props {
  appliance: RemoAPI.Appliance,
  onChange?: (data: IAirConSettings) => void,
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
          <Button className={props.appliance.settings!.button === 'power-off' ? styles.on: ''} button={{name: i18n.t('power'), image: '', label: i18n.t('OFF')}} onClick={(_) => {if (props.onChange) props.onChange({button: 'power-off'})}} />
          { Object.keys(props.appliance.aircon!.range!.modes!).map((v) => (
            <Button
              key={v}
              className={ props.appliance.settings!.button === '' && props.appliance.settings!.mode === v ? styles.on: ''}
              button={{name: i18n.t(v), image: 'ico_ac_' + v, label: i18n.t(v)}}
              onClick={(_) => {if(props.onChange) props.onChange({operation_mode: v})}}
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
