import * as fromSettingStore  from './settings.action';

export interface SettingState {
  selectedLanguage:   string;
  selectedCulture:    string;
  availableLanguages: Array<any>
};

const INITIAL_STATE: SettingState = {
  selectedLanguage: '',
  selectedCulture:  '',
  availableLanguages: [
    {code: 'hr', name: 'HR', culture: 'hr-HR'},
    {code: 'en', name: 'EN', culture: 'en-EN'}
  ]
};

export function reducer(state = INITIAL_STATE, action: fromSettingStore.Actions): SettingState {
  switch (action.type) {
    case fromSettingStore.ActionTypes.SET_LANGUAGE: {
      return Object.assign({}, state, { selectedLanguage: action.payload });
    }

    case fromSettingStore.ActionTypes.SET_CULTURE: {
      return Object.assign({}, state, { selectedCulture: action.payload });
    }

    default: {
      return state;
    }
  }
}
