/// <reference path="../schema.d.ts" />
import * as React from 'react';
import Button from './Button';
import Signal from './Signal';
import styles from './ButtonsTV.module.scss';

interface Props {
  appliance: RemoAPI.Appliance,
}

const ButtonsTV : React.FC<Props> = React.memo((props) => {
  if (props.appliance.type !== "TV") {
    return <div>Wrong appliance!!</div>;
  }
  return (
    <div className={styles.buttons_tv}>
      <div className={styles.buttons}>
        { props.appliance.tv!.buttons!.map((v: RemoAPI.Button, i: number) => <Button key={i} button={v} />) }
      </div>
      <div className={styles.signals}>
        { props.appliance.signals!.map((v: RemoAPI.Signal, i: number) => <Signal key={i} signal={v} />) }
      </div>
    </div>
  )
});

export default ButtonsTV;
