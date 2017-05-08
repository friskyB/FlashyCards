import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import RootReducer from '../reducers/root_reducer';

const logger = createLogger();

const configureStore = (preloadedState = {}) => (
  createStore(RootReducer, preloadedState, applyMiddleware(thunk, logger))
);

export default configureStore;

// const middlewares = [thunk];
//
// if (process.env.NODE_ENV === `development`) {
//   const { logger } = require(`redux-logger`);
//     middlewares.push(logger);
//   }
//
// const configureStore = (preloadedState = {}) => (
//   createStore(RootReducer, preloadedState, applyMiddleware(...middlewares))
// );
