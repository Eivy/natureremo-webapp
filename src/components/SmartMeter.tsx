/// <reference path="../schema.d.ts" />
import { For, Show } from 'solid-js';
import i18n from '../i18n';
import styles from './SmartMeter.module.scss';

/**
 * Multiplier of the cumulative electric energy, indexed by the value of
 * "cumulative_electric_energy_unit" (ECHONET Lite EPC 0xE1). The unit is kWh.
 */
const energyUnits: { [key: string]: number } = {
  '0': 1,
  '1': 0.1,
  '2': 0.01,
  '3': 0.001,
  '4': 0.0001,
  '10': 10,
  '11': 100,
  '12': 1000,
  '13': 10000,
};

// Properties rendered on their own, so they are not repeated in the list.
const summarized = [
  'measured_instantaneous',
  'normal_direction_cumulative_electric_energy',
  'reverse_direction_cumulative_electric_energy',
];

interface Props {
  appliance: RemoAPI.Appliance,
}

export default function SmartMeter(props: Props) {
  const properties = () => props.appliance.smart_meter?.echonetlite_properties || [];
  const property = (name: string) => properties().find((v) => v.name === name);
  const value = (name: string) => {
    const v = property(name)?.val;
    const n = v === undefined ? NaN : Number(v);
    return isNaN(n) ? undefined : n;
  };

  const coefficient = () => value('coefficient') ?? 1;
  const unit = () => energyUnits[property('cumulative_electric_energy_unit')?.val || ''] ?? 1;
  // ex: 5641 * 1 * 0.1 = 564.1kWh
  const energy = (name: string) => {
    const v = value(name);
    return v === undefined ? undefined : v * coefficient() * unit();
  };
  const power = () => value('measured_instantaneous');

  const label = (name: string) => {
    const translated = i18n.t(name);
    return translated === name ? name : translated;
  };

  return (
    <div class={styles.smart_meter}>
      <Show when={properties().length > 0} fallback={<div class={styles.message}>{i18n.t('no_smart_meter_data')}</div>}>
        <div class={styles.summary}>
          <Show when={power() !== undefined}>
            <div class={styles.value}>
              <div class={styles.label}>{i18n.t('measured_instantaneous')}</div>
              <span class={styles.number}>{power()}</span>
              <span class={styles.unit}>W</span>
            </div>
          </Show>
          <For each={['normal_direction_cumulative_electric_energy', 'reverse_direction_cumulative_electric_energy']}>
            {(name) => (
              <Show when={energy(name) !== undefined}>
                <div class={styles.value}>
                  <div class={styles.label}>{i18n.t(name)}</div>
                  <span class={styles.number}>{energy(name)!.toFixed(1)}</span>
                  <span class={styles.unit}>kWh</span>
                </div>
              </Show>
            )}
          </For>
        </div>
        <table class={styles.properties}>
          <tbody>
            <For each={properties().filter((v) => !summarized.includes(v.name!))}>
              {(v: RemoAPI.EchonetLiteProperty) => (
                <tr>
                  <th>{label(v.name!)}</th>
                  <td>{v.val}</td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      </Show>
    </div>
  );
}
