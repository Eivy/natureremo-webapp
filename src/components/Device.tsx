import React from 'react';
import styles from './Device.module.scss';
import Appliance from './Appliance';

interface Props {
  device: RemoAPI.Device,
  appliances: Array<RemoAPI.Appliance>,
}

const Device: React.FC<Props> = React.memo((props) => {
    return (
      <div className={styles.device}>
        <header>
          <span className={styles.nickname}>{props.device.name}</span>
          <span className={styles.sensor}>
            {props.device.newest_events?.te && <span>温度:<span className={styles.value}>{props.device.newest_events!.te!.val}℃</span></span>}
            {props.device.newest_events?.hu && <span className={styles.humid}>湿度:<span className={styles.value}>{props.device.newest_events!.hu!.val}%</span></span>}
            {props.device.newest_events?.il && <span className={styles.illumi}>明るさ:<span className={styles.value}>{props.device.newest_events!.il!.val}</span></span>}
          </span>
        </header>
        <div className={styles.appliances}>
          {props.appliances.map((v) => <Appliance key={v.id} data={v} />)}
        </div>
      </div>
    );
});

export default Device;