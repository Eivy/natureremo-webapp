import React from 'react';
import styles from './Device.module.scss';
import i18n from '../i18n';

interface Props {
  device: RemoAPI.Device,
}

const Device: React.FC<Props> = React.memo((props) => {
    return (
      <div className={styles.device}>
        <header>
          <span className={styles.nickname}>{props.device.name}</span>
          <span className={styles.sensor}>
            {props.device.newest_events?.te && <span>{i18n.t('temp')}:<span className={styles.measure}>℃</span><span className={styles.value}>{props.device.newest_events!.te!.val}</span></span>}
            {props.device.newest_events?.hu && <span className={styles.humid}>{i18n.t('humid')}:<span className={styles.measure}>%</span><span className={styles.value}>{props.device.newest_events!.hu!.val}</span></span>}
            {props.device.newest_events?.il && <span className={styles.illumi}>{i18n.t('bright')}:<span className={styles.value}>{props.device.newest_events!.il!.val}</span></span>}
          </span>
        </header>
        <div className={styles.appliances}>
          {props.children}
        </div>
      </div>
    );
});

export default Device;
