/// <reference path="../schema.d.ts" />
import * as React from 'react';
import Button from './Button';
import Signal from './Signal';
import styles from './ButtonsLight.module.scss';

interface Props {
  appliance: RemoAPI.Appliance,
}

const ButtonsLight : React.FC<Props> = React.memo((props) => {
  if (props.appliance.type !== "LIGHT") {
    return <div>Wrong appliance!!</div>;
  }
  return (
    <div className={styles.buttons_light}>
      <div className={styles.buttons}>
        { props.appliance.light!.buttons!.map((v: RemoAPI.Button, i: number) => <Button key={i} button={v} />) }
      </div>
      <div className={styles.signals}>
        { props.appliance.signals!.map((v: RemoAPI.Signal, i: number) => <Signal key={i} signal={v} />) }
      </div>
    </div>
  )
});

export default ButtonsLight;
