import styles from './Button.module.scss';
import * as Icons from './Icons';
import { components } from './ButtonIconSet';

interface Props {
  signal: RemoAPI.Signal,
  onClick?: (event: any) => void,
}

export default function Signal(props: Props) {
  const icon = () =>
    components.hasOwnProperty(props.signal.image!)
      ? components[props.signal.image as string]()
      : <Icons.Text value={props.signal.name!} />;
  return (
    <div class={styles.button}>
      <button onClick={(e) => props.onClick?.(e)}>{icon()}</button>
      <div class={styles.label}>{props.signal.name}</div>
    </div>
  );
}
