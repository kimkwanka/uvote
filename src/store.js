import { createStore } from 'redux';
import reducer from './reducers';

// Only try to load __PRELOADED_STATE__ when we are the client
const getInitialStore = () => {
  const preloadedState = Object.assign({}, window.__PRELOADED_STATE__);
  console.log(preloadedState);
  const store = createStore(reducer, preloadedState);
  delete window.__PRELOADED_STATE__;
  return store;
}
const createInitialStore = (state) => {
  return createStore(reducer, state);
}

export {
  createInitialStore,
  getInitialStore,
};