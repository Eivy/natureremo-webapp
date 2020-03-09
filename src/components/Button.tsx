import React from 'react'
import styles from './Button.module.scss'

import * as Icons from './Icons'
import {components} from './ButtonIconSet';

interface Props {
  button: RemoAPI.Button,
  onClick?: (event: any) => void
}

const Button: React.FC<Props> = React.memo((props) => {
  let Icon: JSX.Element
  Icon = components.hasOwnProperty(props.button.image!) ? components[props.button.image as string] : React.createElement(Icons.Text, {value: props.button.label!})
  return (
    <div className={styles.button} >
    <button onClick={props.onClick}>{Icon}</button>
    <div className={styles.label}>{props.button.label}</div>
    </div>
  );
});

export default Button;
