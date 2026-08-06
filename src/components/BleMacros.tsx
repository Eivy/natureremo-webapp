/// <reference path="../schema.d.ts" />
import { For, Show } from 'solid-js';
import Button from './Button';
import i18n from '../i18n';
import styles from './BleMacros.module.scss';

/**
 * Icon for a macro name. Macro names are not part of the API specification,
 * so unknown ones fall back to the name rendered as text by Button.
 */
const macroIcons: { [name: string]: string } = {
  lock: 'ico_lock',
  unlock: 'ico_unlock',
  open: 'ico_curtain_open',
  close: 'ico_curtain_close',
  stop: 'ico_stop',
};

interface Props {
  appliance: RemoAPI.Appliance,
  onMacroClick?: (macro: RemoAPI.BLEPrivateMacro) => void,
}

/**
 * Buttons for the macros of a BLE appliance. The Cloud API has no appliance
 * specific endpoint for BLE appliances such as Qrio Lock, they are controlled
 * by executing one of the macros registered on the appliance.
 */
export default function BleMacros(props: Props) {
  const macros = () => Object.entries(props.appliance.ble?.macros || {});
  return (
    <Show when={macros().length > 0} fallback={<div class={styles.message}>{i18n.t('no_ble_macros')}</div>}>
      <div class={styles.macros}>
        <For each={macros()}>
          {([name, macro]) => (
            <Button
              button={{ name: name, image: macroIcons[name] || '', label: name }}
              onClick={() => {if (props.onMacroClick) props.onMacroClick(macro)}}
            />
          )}
        </For>
      </div>
    </Show>
  );
}
