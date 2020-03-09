import React from 'react'
import styles from './Button.module.scss'

import * as Icons from './Icons'
import {components} from './ButtonIconSet';

interface Props {
  signal: RemoAPI.Signal,
  onClick?: (event: any) => void,
}

const Signal: React.FC<Props> = React.memo((props) => {
  let Icon: JSX.Element
  Icon = components.hasOwnProperty(props.signal.image!) ? components[props.signal.image as string] : React.createElement(Icons.Text, {value: props.signal.name!})
  return (
    <div className={styles.button} >
    <button onClick={props.onClick}>{Icon}</button>
    <div className={styles.label}>{props.signal.name}</div>
    </div>
  );
});

export default Signal;
