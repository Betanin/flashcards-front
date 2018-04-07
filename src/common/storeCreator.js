import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { browserHistory } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import { startListener } from './router/listener';
import { routerMiddleware } from './middlewares/routerMiddleware';
import rootReducer from './rootReducer';

const storeCreator = () => {

    let composeEnhancers = compose;
    const middlewares = [thunk];
    middlewares.push(routerMiddleware(browserHistory));
    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger());
        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    }
    
    const store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(...middlewares))
    );

    const history = createHistory();
    startListener(history, store);

    return store;

};

export default storeCreator;