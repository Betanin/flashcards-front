import board from '../features/board/i18n';
import home from '../features/home/i18n';
import initial from '../features/initial/i18n';
import result from '../features/result/i18n';
import create from '../features/create/i18n';
import message from '../features/message/i18n';
import login from '../features/login/i18n';
import signup from '../features/signup/i18n';

const i18n = {
    'en-US': {
        home: home['en-US'],
        board: board['en-US'],
        welcome: initial['en-US'],
        result: result['en-US'],
        create: create['en-US'],
        message: message['en-US'],
        login: login['en-US'],
        signup: signup['en-US']
    },
    'pt-BR': {
        home: home['pt-BR'],
        board: board['pt-BR'],
        welcome: initial['pt-BR'],
        result: result['pt-BR'],
        create: create['pt-BR'],
        message: message['pt-BR'],
        login: login['pt-BR'],
        signup: signup['pt-BR']
    },
    'es-ES': {
        home: home['es-ES'],
        board: board['es-ES'],
        welcome: initial['es-ES'],
        result: result['es-ES'],
        create: create['es-ES'],
        message: message['es-ES'],
        login: login['es-ES'],
        signup: signup['es-ES']
    }
};

const flattenMessages = (nestedMessages, prefix = '') => {
    return Object.keys(nestedMessages).reduce((messages, key) => {
        let value = nestedMessages[key];
        let prefixedKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === 'string') {
            messages[prefixedKey] = value;
        } else {
            Object.assign(messages, flattenMessages(value, prefixedKey));
        }

        return messages;
    }, {});
}

export default (locale) => flattenMessages(i18n[locale]);