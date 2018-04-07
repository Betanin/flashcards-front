import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import Header from './Header';
import Menu from './Menu';
import styles from './App.css';

class App extends Component {

    render() {
        const { menu, blockScreen } = this.props;

        let style = (blockScreen || menu.status === 'OPENED')
            ? styles.blockscreen
            : {};

        return (
            <div className={style}>
                <Header />
                <Menu />
                {this.props.children}
            </div>
        );
    }

}

App.propTypes = {
    children: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        menu: state.home.menu
    };
};

App = withRouter(connect(mapStateToProps)(App));

export default App;
