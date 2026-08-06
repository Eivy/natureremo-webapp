/// <reference path="../schema.d.ts" />
import { Show } from 'solid-js';
import BleMacros from './BleMacros';
import i18n from '../i18n';
import styles from './QrioLock.module.scss';

interface Props {
  appliance: RemoAPI.Appliance,
  onMacroClick?: (macro: RemoAPI.BLEPrivateMacro) => void,
}

export default function QrioLock(props: Props) {
  const lock = () => props.appliance.qrio_lock;
  return (
    <div class={styles.qrio_lock}>
      <div class={styles.status}>
        <Show when={lock()?.device?.name}>
          <span class={styles.name}>{lock()!.device!.name}</span>
        </Show>
        <span class={lock()?.is_available ? styles.available : styles.unavailable}>
          {i18n.t(lock()?.is_available ? 'available' : 'unavailable')}
        </span>
      </div>
      <BleMacros appliance={props.appliance} onMacroClick={props.onMacroClick} />
    </div>
  );
}
