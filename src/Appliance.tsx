/// <reference path="schema.d.ts" />
import React from 'react'
import styles from './Appliance.module.scss'

import * as Icons from './Icons'

const components: any = {
  "ico_av": Icons.AV,
  "ico_ac_1": Icons.AirCon1,
  "ico_ac_0": Icons.AirCon2,
  "ico_air_purifier": Icons.AirPurifier,
  "ico_audio": Icons.Audio,
  "ico_curtain": Icons.Curtain,
  "ico_etc": Icons.Etc,
  "ico_fan": Icons.Fan,
  "ico_light": Icons.Light,
  "ico_tv": Icons.TV,
  "ico_robot": Icons.Robot,
}

interface Props {
  data: RemoAPI.Appliance,
}

const Appliance: React.FC<Props> = React.memo((props) => {

  let power
  let Icon
  let mainClassName = [styles.main]
  try {
    Icon = components.hasOwnProperty(props.data.image) ? components[props.data.image!] : Icons.Etc
  }
  catch {
    Icon = Icons.Etc
  }
  if (props.data.type === 'LIGHT') {
    power = (<button className={styles.power}><Icons.Power power={props.data.light!.state!.power!} /></button>)
    mainClassName.push(styles.circle)
    mainClassName.push(styles[props.data.light!.state!.power!])
  } else if (props.data.type === 'AC') {
    power = (<button className={styles.power}><Icons.Power power={props.data.settings!.button!.replace(/power-/, '') === 'on' ? 'on' : 'off'} /></button>)
    mainClassName.push(styles.circle)
    mainClassName.push(styles[props.data.settings!.button!.replace(/power-/, '')])
  }
  return (
      <div className={styles.appliance}>
        <button className={mainClassName.join(" ")}><Icon /></button>
        <span className={styles.label}>{props.data.nickname}</span>
        {power}
      </div>
      );
});

export default Appliance;
