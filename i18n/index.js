import { Platform, NativeModules } from 'react-native';
import I18n from 'i18n-js';
import en from './src/locales/en-US'; // importa o objeto de traduções para o idioma inglês
import pt from './src/locales/pt-BR'; // importa o objeto de traduções para o idioma português

// Função que irá nos auxiliar a normalizar as traduções que serão recebidas pela função getLanguageByDevice
// Isso é necessário pois no android e no iOS o retorno do mesmo idioma pode ser diferente
// Exemplo: no iOS podemos receber pt_US e no android pt_BR para o idioma português Brasil.
const normalizeTranslate = {
  en_US: 'en_US',
  pt_BR: 'pt_BR',
  en: 'en_US',
  pt_US: 'pt_BR',
};

// Função responsável por adquirir o idioma utilizado no device
export const getLanguageByDevice = () => {
  return Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0]// Adquire o idioma no device iOS
    : NativeModules.I18nManager.localeIdentifier; // Adquire o idioma no device Android
};

// Aqui setamos os idiomas que o I18N irá dar suporte
I18n.translations = {
  en_US: en,
  en: en,
  pt_BR: pt,
  pt_US: pt,
};

// Função responsável por verificar se o idioma atual do divice está sendo suportado, caso não ele irá setar como 'pt_BR'
const setLanguageToI18n = () => {
  let language = getLanguageByDevice();
  if (language === undefined && Platform.OS === 'ios') {
    // iOS 13 workaround, take first of AppleLanguages array  ["en", "en-NZ"]
    language = NativeModules.SettingsManager.settings.AppleLanguages[0]
    if (language == undefined) {
      language = 'pt_BR'// default language
    }
  }
  const translateNormalize = normalizeTranslate[language];
  const iHaveThisLanguage = I18n.translations.hasOwnProperty(
    translateNormalize,
  );
  iHaveThisLanguage
    ? (I18n.locale = translateNormalize)
    : (I18n.defaultLocale = 'pt_BR');
};

setLanguageToI18n();

export const translate = (key, opt) => I18n.t(key, opt);
