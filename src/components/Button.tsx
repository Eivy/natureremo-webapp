import styles from './Button.module.scss';
import * as Icons from './Icons';
import { components } from './ButtonIconSet';
import i18n from '../i18n';

interface Props {
  button: RemoAPI.Button,
  onClick?: (event: any) => void,
  class?: string,
  className?: string,
  children?: any,
}

export default function Button(props: Props) {
  const icon = () =>
    components.hasOwnProperty(props.button.image!)
      ? components[props.button.image as string]()
      : <Icons.Text value={props.button.label!} />;
  return (
    <div class={styles.button}>
      <button class={props.class || props.className} onClick={(e) => props.onClick?.(e)}>{icon()}</button>
      <div class={styles.label}>{i18n.t(props.button.label!)}</div>
    </div>
  );
}
