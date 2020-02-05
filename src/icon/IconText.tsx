import * as React from 'react';

interface Props {
  value: string,
}

class IconText extends React.Component<Props> {

  private ref = React.createRef<SVGSVGElement>();

  render() {
    return (
      <svg className="icon num1" viewBox="0 0 50 50" ref={this.ref}>
        <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle">{this.props.value}</text>
        {this.props.value}
      </svg >
    )
  }

  componentDidMount() {
    if (!this.ref.current) {
      return;
    }
    const isNum = isNaN(parseInt(this.props.value));
    const ref = this.ref.current!;
    const t = ref.querySelector("text")!;
    t.style.fontSize = ref.clientWidth / (isNum ? 6 : 2) + 'px';
  }

}

export default IconText;
