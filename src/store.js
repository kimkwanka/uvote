/* global window */
/* eslint-disable no-underscore-dangle */
import { createStore } from 'redux';
import reducer from './reducers';

const getHydratedStore = () => {
  const preloadedState = Object.assign({}, window.__PRELOADED_STATE__);
  const store = createStore(reducer, preloadedState);
  delete window.__PRELOADED_STATE__;
  return store;
};

const hydrateStore = state => (createStore(reducer, state));

export {
  hydrateStore,
  getHydratedStore,
};
