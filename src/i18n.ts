import i18n from 'i18next';
import ja from './locales/ja';
import en from './locales/en';

i18n.init({
  lng: window.navigator.language,
  resources: {
    ja,
    en,
  },
});

export default i18n;
