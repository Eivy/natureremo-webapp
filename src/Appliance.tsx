/// <reference path="schema.d.ts" />
import React from 'react'
import './Appliance.scss'
import './Icons.scss'

import {
  IconAV,
  IconAirCon1,
  IconAirCon2,
  IconAirPurifier,
  IconAudio,
  IconCurtain,
  IconEtc,
  IconFan,
  IconLight,
  IconTV,
  IconVacuum,
  IconPower,
} from './Icons'

const components: any = {
  "ico_av": IconAV,
  "ico_ac_1": IconAirCon1,
  "ico_ac_2": IconAirCon2,
  "ico_air_purifier": IconAirPurifier,
  "ico_audio": IconAudio,
  "ico_curtain": IconCurtain,
  "ico_etc": IconEtc,
  "ico_fan": IconFan,
  "ico_light": IconLight,
  "ico_tv": IconTV,
  "ico_vacuum": IconVacuum,
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
      Icon = components.hasOwnProperty(this.props.icon) ? components[this.props.icon] : IconEtc
    }
    catch {
      Icon = IconEtc
    }
    if (this.props.type === 'LIGHT' || this.props.type === 'AC') {
      power = (<button className="power"><IconPower /></button>)
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
