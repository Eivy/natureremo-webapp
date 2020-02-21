import * as React from 'react'
import { withRouter } from 'react-router';
import {RouteComponentProps} from 'react-router-dom';
import styles from './Config.module.scss'

interface Props extends RouteComponentProps{}

interface State {
  token?: string,
}

class Config extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      token: localStorage.getItem("access_token") as string || ''
    };
    this.onTokenChange = this.onTokenChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onTokenChange(event: any) {
    this.setState({token: event.target.value});
  }

  onClick(event: any) {
    if (this.state.token && this.state.token.length > 0) {
      localStorage.setItem('access_token', this.state.token);
    } else {
      localStorage.removeItem('access_token');
    }
    this.props.history.push('/');
  }

  render() {
    return (
      <div className={styles.config}>
        <label>Access Token
        <input value={this.state.token} autoFocus onChange={this.onTokenChange}/>
        </label>
        <button onClick={this.onClick}>Save</button>
      </div>
    )
  }

}

export default withRouter(Config);
