import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import * as actions from '../state/actions';
import styles from './Header.css';

class Header extends Component {

    render() {

        const { openMenu } = this.props;

        return (
            <header>
                <div className={styles.buttoncontainer}>
                    <button className={styles.openmenu} onClick={openMenu} />
                </div>
                <div className={styles.title}>
                    <p className={styles.titletext}>
                        <FormattedMessage
                            id="home.header.title"
                            defaultMessage="Flashcards Chalenge" />
                    </p>
                </div>
            </header>
        )
    }

}

Header.propTypes = {
    openMenu: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
    return {
        openMenu: () => {            
            dispatch(actions.openMenu());
        }
    }
}

Header = withRouter(connect(undefined, mapDispatchToProps)(Header));

export default Header;