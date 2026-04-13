/// <reference path="../schema.d.ts" />
import { For, Show } from 'solid-js';
import Button from './Button';
import Signal from './Signal';
import styles from './ButtonsTV.module.scss';

interface Props {
  appliance: RemoAPI.Appliance,
  onButtonClick?: (button: RemoAPI.Button) => void,
  onSignalClick?: (button: RemoAPI.Signal) => void,
}

export default function ButtonsTV(props: Props) {
  return (
    <Show when={props.appliance.type === "TV"} fallback={<div>Wrong appliance!!</div>}>
      <div class={styles.buttons_tv}>
        <div class={styles.buttons}>
          <For each={props.appliance.tv!.buttons!}>
            {(v: RemoAPI.Button) => <Button button={v} onClick={() => {if (props.onButtonClick) props.onButtonClick(v)}} />}
          </For>
        </div>
        <div class={styles.signals}>
          <For each={props.appliance.signals!}>
            {(v: RemoAPI.Signal) => <Signal signal={v} onClick={() => {if (props.onSignalClick) props.onSignalClick(v)}} />}
          </For>
        </div>
      </div>
    </Show>
  );
}
