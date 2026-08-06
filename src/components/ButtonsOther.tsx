/// <reference path="../schema.d.ts" />
import { For, Show } from 'solid-js';
import Signal from './Signal';
import i18n from '../i18n';
import styles from './ButtonsOther.module.scss';

interface Props {
  appliance: RemoAPI.Appliance,
  onSignalClick?: (button: RemoAPI.Signal) => void,
}

/**
 * Fallback view for appliance types this app has no dedicated UI for.
 * Every appliance may have learned signals regardless of its type, so show
 * them. When there is nothing to send, tell which type is not supported yet.
 */
export default function ButtonsOther(props: Props) {
  const signals = () => props.appliance.signals || [];
  return (
    <div class={styles.buttons_other}>
      <Show
        when={signals().length > 0}
        fallback={<div class={styles.message}>{i18n.t('unsupported_appliance', { type: props.appliance.type })}</div>}
      >
        <div class={styles.signals}>
          <For each={signals()}>
            {(v: RemoAPI.Signal) => <Signal signal={v} onClick={() => {if (props.onSignalClick) props.onSignalClick(v)}} />}
          </For>
        </div>
      </Show>
    </div>
  );
}
