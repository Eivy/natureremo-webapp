import { Show } from 'solid-js';
import styles from './Appliance.module.scss';
import * as Icons from './Icons';

const iconComponents: any = {
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
};

interface Props {
  data: RemoAPI.Appliance,
  onClick?: (event: any) => void,
  onPowerClick?: (event: any) => void,
}

export default function Appliance(props: Props) {
  const eventWrapper = (event: any) => {
    event.stopPropagation();
    if (props.onPowerClick) {
      props.onPowerClick(event);
    }
  };

  const Icon = () => {
    const Comp = iconComponents.hasOwnProperty(props.data.image) ? iconComponents[props.data.image!] : Icons.Etc;
    return <Comp />;
  };

  const mainClassName = () => {
    const classes = [styles.main];
    if (props.data.type === 'LIGHT') {
      classes.push(styles.circle);
      classes.push(styles[props.data.light!.state!.power!]);
    } else if (props.data.type === 'AC') {
      classes.push(styles.circle);
      classes.push(styles[props.data.settings!.button! === '' ? 'on' : 'off']);
    }
    return classes.join(" ");
  };

  return (
    <div class={styles.appliance} onClick={() => props.onClick?.({})}>
      <button class={mainClassName()}><Icon /></button>
      <span class={styles.label}>{props.data.nickname}</span>
      <Show when={props.data.type === 'LIGHT'}>
        <button class={styles.power} onClick={eventWrapper}><Icons.Power power={props.data.light!.state!.power!} /></button>
      </Show>
      <Show when={props.data.type === 'AC'}>
        <button class={styles.power} onClick={eventWrapper}><Icons.Power power={props.data.settings!.button! === '' ? 'on' : 'off'} /></button>
      </Show>
    </div>
  );
}
