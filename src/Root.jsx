import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { push } from './common/router/actions';
import PropTypes from 'prop-types';
import { Welcome } from './features/initial/index';
import { Board } from './features/board/index';
import { Result } from './features/result/index';
import { Create } from './features/create/index';
import { Message } from './features/message/index';
import { Signup } from './features/signup/index';
import { Login, recoverSession } from './features/login/index';
import './Root.css';

const Root = ({ store }) => {

    store.dispatch(push('/'));
    recoverSession()(store.dispatch);

    return (
        <Provider store={store}>
            <div>
                <Router history={browserHistory}>
                    <Route path="/" component={Welcome} />
                    <Route path="/board" component={Board} />
                    <Route path="/result" component={Result} />
                    <Route path="/create" component={Create} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                </Router>
                <Message />
            </div>
        </Provider>
    );

};

Root.propTypes = {
    store: PropTypes.object.isRequired,
};

export default Root;