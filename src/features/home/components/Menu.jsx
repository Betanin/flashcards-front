import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import * as actions from '../state/actions';
import { finishGame } from '../../board/index';
import * as flashcardCreation from '../../create/index';
import styles from './Menu.css';

class Menu extends Component {

    render() {
        const { menu, game, closeMenu, finishGame, startFlashcardCreation } = this.props;

        const menuStyle = [styles.menu];

        if(menu.status === 'OPENED') 
            menuStyle.push(styles.active);

        const menuItems = [];

        menuItems.push(
            <li>
                <a onClick={finishGame}>
                    <FormattedMessage
                        id="home.menu.finish"
                        defaultMessage="Finish Game" />
                </a>
            </li>
        );

        if(game.status !== 'PLAYING') {
            menuItems.push(
                <li>
                    <a onClick={startFlashcardCreation}>
                        <FormattedMessage
                            id="home.menu.create"
                            defaultMessage="Create Flashcard" />
                    </a>
                </li>
            );
        }
        
        return (
            <nav className={menuStyle.join(' ')}>
                <button className={styles.close} onClick={closeMenu} />
                <ul className={styles.list}>
                    {menuItems.map(item => item)}
                </ul>
            </nav>
        )
    }

}

Menu.propTypes = {
    menu: PropTypes.object.isRequired,
    closeMenu: PropTypes.func.isRequired,
    finishGame: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        menu: state.home.menu,
        game: state.board.game
    };
};

const mapDispatchToProps = dispatch => {
    return {
        closeMenu: () => {
            dispatch(actions.closeMenu());
        },
        finishGame: () => {
            dispatch(actions.closeMenu());
            dispatch(finishGame());
        },
        startFlashcardCreation: () => {
            dispatch(actions.closeMenu());
            dispatch(flashcardCreation.open());
        }        
    }
}

Menu = withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu));

export default Menu;