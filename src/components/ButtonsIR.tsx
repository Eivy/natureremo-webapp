/// <reference path="../schema.d.ts" />
import { For, Show } from 'solid-js';
import Signal from './Signal';
import styles from './ButtonsIR.module.scss';

interface Props {
  appliance: RemoAPI.Appliance,
  onSignalClick?: (button: RemoAPI.Signal) => void,
}

export default function ButtonsIR(props: Props) {
  return (
    <Show when={props.appliance.type === "IR"} fallback={<div>Wrong appliance!!</div>}>
      <div class={styles.buttons_ir}>
        <div class={styles.signals}>
          <For each={props.appliance.signals!}>
            {(v: RemoAPI.Signal) => <Signal signal={v} onClick={() => {if (props.onSignalClick) props.onSignalClick(v)}} />}
          </For>
        </div>
      </div>
    </Show>
  );
}
