/// <reference path="../schema.d.ts" />
import * as React from 'react';
import Signal from './Signal';
import styles from './ButtonsIR.module.scss';

interface Props {
  appliance: RemoAPI.Appliance,
}

const ButtonsIR : React.FC<Props> = React.memo((props) => {
  if (props.appliance.type !== "IR") {
    return <div>Wrong appliance!!</div>;
  }
  return (
    <div className={styles.buttons_ir}>
      <div className={styles.signals}>
        { props.appliance.signals!.map((v: RemoAPI.Signal, i: number) => <Signal key={i} signal={v} />) }
      </div>
    </div>
  )
});

export default ButtonsIR;
