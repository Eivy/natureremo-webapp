/// <reference path="schema.d.ts" />
import React from 'react'
import './Appliance.scss'
import './Icons.scss'

import * as Icons from './Icons'

const components: any = {
  "ico_av": Icons.AV,
  "ico_ac_1": Icons.AirCon1,
  "ico_ac_2": Icons.AirCon2,
  "ico_air_purifier": Icons.AirPurifier,
  "ico_audio": Icons.Audio,
  "ico_curtain": Icons.Curtain,
  "ico_etc": Icons.Etc,
  "ico_fan": Icons.Fan,
  "ico_light": Icons.Light,
  "ico_tv": Icons.TV,
  "ico_vacuum": Icons.Vacuum,
}

interface Props {
  icon: string,
  nickname: string,
  type: string,
  status?: string,
}

interface State {
}

class Appliance extends React.Component<Props, State> {

  render() {
    let power
    let Icon
    let mainClassName = ["main"]
    try {
      Icon = components.hasOwnProperty(this.props.icon) ? components[this.props.icon] : Icons.Etc
    }
    catch {
      Icon = Icons.Etc
    }
    if (this.props.type === 'LIGHT' || this.props.type === 'AC') {
      power = (<button className="power"><Icons.Power /></button>)
      mainClassName.push("circle")
      if (this.props.status === "on") {
        mainClassName.push("on")
      }
    }
    return (
        <div className="appliance">
        <button className={mainClassName.join(" ")}><Icon /></button>
        <span className="label">{this.props.nickname}</span>
        {power}
        </div>
        )
  }

}

export default Appliance
