/// <reference path="schema.d.ts" />
import React from 'react'
import './Appliance.scss'
import './Icons.scss'

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

interface State {
}

class Appliance extends React.Component<Props, State> {

  render() {
    let power
    let Icon
    let mainClassName = ["main"]
    try {
      Icon = components.hasOwnProperty(this.props.data.image) ? components[this.props.data.image!] : Icons.Etc
    }
    catch {
      Icon = Icons.Etc
    }
    if (this.props.data.type === 'LIGHT') {
      power = (<button className="power"><Icons.Power power={this.props.data.light!.state!.power!} /></button>)
      mainClassName.push("circle")
      mainClassName.push(this.props.data.light!.state!.power!)
    } else if (this.props.data.type === 'AC') {
      power = (<button className="power"><Icons.Power power={this.props.data.settings!.button!.replace(/power-/, '') === 'on' ? 'on' : 'off'} /></button>)
      mainClassName.push("circle")
      mainClassName.push(this.props.data.settings!.button!.replace(/power-/, ''))
    }
    return (
        <div className="appliance">
          <button className={mainClassName.join(" ")}><Icon /></button>
          <span className="label">{this.props.data.nickname}</span>
          {power}
        </div>
        )
  }

}

export default Appliance
