import * as React from 'react';

interface Props {
  on: boolean,
}

class IconPower extends React.Component<Props> {

  public static defaultProps: Props = { on: false };

  render() {
    return (
      <svg className={['icon', 'power', this.props.on ? 'on' : ''].join(' ')} viewBox="0 0 60 60">
        <path d="
        M 30,3 30,35
        M 20,15 A20 20 0 1 0 40,15
        " />
        Power
      </svg >
    )
  }

}

export default IconPower;
