/// <reference path="../schema.d.ts" />
import { For, Show } from 'solid-js';
import BleMacros from './BleMacros';
import i18n from '../i18n';
import styles from './MorninPlus.module.scss';

interface Props {
  appliance: RemoAPI.Appliance,
  onMacroClick?: (macro: RemoAPI.BLEPrivateMacro) => void,
}

export default function MorninPlus(props: Props) {
  // A single appliance drives one device per curtain rail.
  const devices = () => props.appliance.mornin_plus?.devices || [];
  return (
    <div class={styles.mornin_plus}>
      <div class={styles.status}>
        <For each={devices()}>
          {(v: RemoAPI.MorninPlusDevice) => (
            <div class={styles.device}>
              <span class={styles.name}>{v.name}</span>
              <span class={v.active ? styles.active : styles.inactive}>
                {i18n.t(v.active ? 'active' : 'inactive')}
              </span>
            </div>
          )}
        </For>
        <Show when={props.appliance.mornin_plus?.hi_speed_mode}>
          <div class={styles.hi_speed_mode}>{i18n.t('hi_speed_mode')}</div>
        </Show>
      </div>
      <BleMacros appliance={props.appliance} onMacroClick={props.onMacroClick} />
    </div>
  );
}
