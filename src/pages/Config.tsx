import * as React from 'react'
import {RouteComponentProps} from 'react-router-dom';
import { connect } from 'react-redux';
import { Actions, mapDispatchToProps, mapStateToProps } from '../dispatcher';
import { State } from '../states';
import i18n from '../i18n';
import Api from '../Api';
import styles from './Config.module.scss'

export type Props = State & Actions & RouteComponentProps;

class Config extends React.Component<Props> {

  token: string;

  constructor(props: Props) {
    super(props);
    this.token = localStorage.getItem('access_token') || '';
    this.onTokenChange = this.onTokenChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onTokenChange(event: any) {
    this.token = event.target.value;
  }

  onClick(event: any) {
    if (this.token && this.token.length > 0) {
      localStorage.setItem('access_token', this.token);
      this.props.history.push('/');
      Api.setToken(this.token);
      Api.GetDevices().then((v) => {
        if (v) {
          this.props.updateDevices(v);
        }
      });
      Api.GetAppliances().then((v) => {
        if (v) {
          this.props.updateAppliances(v);
        }
      });
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
        <input defaultValue={this.token} autoFocus onChange={this.onTokenChange}/>
        </label>
        <button onClick={this.onClick}>{i18n.t('save')}</button>
      </div>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Config);
