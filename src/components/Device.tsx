import type { JSX } from 'solid-js';
import styles from './Device.module.scss';
import i18n from '../i18n';

interface Props {
  device: RemoAPI.Device,
  children?: JSX.Element,
}

export default function Device(props: Props) {
  return (
    <div class={styles.device}>
      <header>
        <span class={styles.nickname}>{props.device.name}</span>
        <span class={styles.sensor}>
          {props.device.newest_events?.te && <span>{i18n.t('temp')}:<span class={styles.measure}>℃</span><span class={styles.value}>{props.device.newest_events!.te!.val}</span></span>}
          {props.device.newest_events?.hu && <span class={styles.humid}>{i18n.t('humid')}:<span class={styles.measure}>%</span><span class={styles.value}>{props.device.newest_events!.hu!.val}</span></span>}
          {props.device.newest_events?.il && <span class={styles.illumi}>{i18n.t('bright')}:<span class={styles.value}>{props.device.newest_events!.il!.val}</span></span>}
        </span>
      </header>
      <div class={styles.appliances}>
        {props.children}
      </div>
    </div>
  );
}
