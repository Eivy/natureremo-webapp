import { createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { setDevices, setAppliances } from '../store';
import i18n from '../i18n';
import Api from '../Api';
import styles from './Config.module.scss';

export default function Config() {
  const navigate = useNavigate();
  const [token, setToken] = createSignal(localStorage.getItem('access_token') || '');

  const onTokenChange = (event: any) => {
    setToken(event.target.value);
  };

  const onClick = () => {
    const t = token();
    if (t && t.length > 0) {
      localStorage.setItem('access_token', t);
      navigate('/');
      Api.setToken(t);
      Api.GetDevices().then((v) => {
        if (v) {
          setDevices(v);
        }
      });
      Api.GetAppliances().then((v) => {
        if (v) {
          setAppliances(v);
        }
      });
    } else {
      localStorage.removeItem('access_token');
    }
  };

  return (
    <div class={styles.config}>
      <div class={styles.warning}>{i18n.t('product_warning')}</div>
      <div>{i18n.t('get_access_token')} <a href="https://home.nature.global">{i18n.t('here')}</a></div>
      <label>{i18n.t('access_token')}
        <input value={token()} autofocus onInput={onTokenChange} />
      </label>
      <button onClick={onClick}>{i18n.t('save')}</button>
    </div>
  );
}
