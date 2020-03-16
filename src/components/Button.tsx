import React from 'react'
import styles from './Button.module.scss'
import i18n from '../i18n';

import * as Icons from './Icons'
import {components} from './ButtonIconSet';

interface Props {
  button: RemoAPI.Button,
  onClick?: (event: any) => void
  className?: string,
}

const Button: React.FC<Props> = React.memo((props) => {
  let Icon: JSX.Element
  Icon = components.hasOwnProperty(props.button.image!) ? components[props.button.image as string] : React.createElement(Icons.Text, {value: props.button.label!})
  return (
    <div className={styles.button} >
    <button className={props.className} onClick={props.onClick}>{Icon}</button>
    <div className={styles.label}>{i18n.t(props.button.label!)}</div>
    </div>
  );
});

export default Button;
