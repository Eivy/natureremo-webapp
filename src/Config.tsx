import * as React from 'react'
import styles from './Config.module.scss'

interface Props {
}

interface State {
  token?: string,
}

class Config extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      token: localStorage.getItem("access_token") as string || ''
    }
    this.onTokenChange = this.onTokenChange.bind(this)
  }

  onTokenChange(event: any) {
    localStorage.setItem('access_token', event.target.value)
    this.setState({ token: event.target.value })
  }

  render() {
    let token = this.state.token
    return (
      <div className={styles.config}>
        <label>Access Token
        <input value={token} onChange={this.onTokenChange} />
        </label>
        <button>Save</button>
      </div>
    )
  }

}

export default Config
