import { createStore, combineReducers } from 'redux';
import { reducer, State } from './states';

export type AppState = {
  remo: State,
};

const store = createStore(
  combineReducers<AppState>({
    remo: reducer,
  })
);

export default store;
