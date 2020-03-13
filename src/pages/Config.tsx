import * as React from 'react'
import {RouteComponentProps} from 'react-router-dom';
import i18n from '../i18n';
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
  }

  render() {
    return (
      <div className={styles.config}>
        <div className={styles.warning}>{i18n.t('product_warning')}</div>
        <div >{i18n.t('get_access_token')} <a href="https://home.nature.global">{i18n.t('here')}</a></div>
        <label>{i18n.t('access_token')}
        <input value={this.state.token} autoFocus onChange={this.onTokenChange}/>
        </label>
        <button onClick={this.onClick}>{i18n.t('save')}</button>
      </div>
    )
  }

}

export default Config;
