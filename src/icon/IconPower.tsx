import * as React from 'react';

interface Props {
  on: boolean,
}

class IconPower extends React.Component<Props> {

  public static defaultProps: Props = { on: false };

  render() {
    return (
      <svg className={['icon', 'power', this.props.on ? 'on' : ''].join(' ')} viewBox="0 0 50 50">
        <path d="
        M 25,10 25,30
        M 20,18 A12 12 0 1 0 30,18
        " />
        Power
      </svg >
    )
  }

}

export default IconPower;
