import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './CardWord.css';

class CardWord extends Component {

    render() {
        const { word } = this.props;

        return (
            <p className={styles.word}>
                {word}
            </p>
        )
    }

}

CardWord.propTypes = {
    word: PropTypes.string.isRequired
};

export default CardWord;