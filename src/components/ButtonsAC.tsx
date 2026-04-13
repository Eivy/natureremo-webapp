/// <reference path="../schema.d.ts" />
import { For, Show } from 'solid-js';
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
}

interface ACSettingProps {
  setting: RemoAPI.AirConParams,
  range: RemoAPI.AirConRangeMode,
  onChange?: (data: RemoAPI.AirConParams) => void,
}

function AirConSettings(props: ACSettingProps) {
  const target: {[key: string]: (v: string) => IAirConSettings} = {
    'vol': (v: string): IAirConSettings => { return {air_volume: v}; },
    'dir': (v: string): IAirConSettings => { return {air_direction: v}; },
    'temp': (v: string): IAirConSettings => { return {temperature: v}; },
  };
  return (
    <div>
      <For each={Object.keys(props.range)}>
        {(range) => (
          <Show when={(props.range as any)[range].filter((v: string) => v !== '').length > 0}>
            <label>
              { i18n.t(range) }:
              <select
                class={range}
                value={(props.setting as any)[range]}
                onChange={(event) => {if (props.onChange) props.onChange(target[range](event.target.value as string))}}
              >
                <For each={(props.range as any)[range]}>
                  {(v: string) => <option value={v}>{v}</option>}
                </For>
              </select>
            </label>
          </Show>
        )}
      </For>
    </div>
  );
}

interface Props {
  appliance: RemoAPI.Appliance,
  onChange?: (data: IAirConSettings) => void,
  onSignalClick?: (button: RemoAPI.Signal) => void,
}

export default function ButtonsAC(props: Props) {
  return (
    <Show when={props.appliance.type === "AC"} fallback={<div>Wrong appliance!!</div>}>
      <div class={styles.buttons_ac}>
        <div class={styles.buttons}>
          <div class={styles.mode}>
            <Button class={props.appliance.settings!.button === 'power-off' ? styles.on : ''} button={{name: i18n.t('power'), image: '', label: i18n.t('OFF')}} onClick={() => {if (props.onChange) props.onChange({button: 'power-off'})}} />
            <For each={Object.keys(props.appliance.aircon!.range!.modes!)}>
              {(v) => (
                <Button
                  class={props.appliance.settings!.button === '' && props.appliance.settings!.mode === v ? styles.on : ''}
                  button={{name: i18n.t(v), image: 'ico_ac_' + v, label: i18n.t(v)}}
                  onClick={() => {if(props.onChange) props.onChange({operation_mode: v})}}
                >{v}</Button>
              )}
            </For>
          </div>
          <div class={styles.settings}>
            <Show when={props.appliance.settings && (props.appliance.aircon!.range!.modes! as any)[props.appliance.settings!.mode!]}>
              <AirConSettings setting={props.appliance.settings!} range={(props.appliance.aircon!.range!.modes! as any)[props.appliance.settings!.mode!]} onChange={props.onChange!} />
            </Show>
          </div>
        </div>
        <div class={styles.signals}>
          <For each={props.appliance.signals!}>
            {(v: RemoAPI.Signal) => (
              <Signal
                signal={v}
                onClick={() => {if (props.onSignalClick) props.onSignalClick(v)}}
              />
            )}
          </For>
        </div>
      </div>
    </Show>
  );
}
