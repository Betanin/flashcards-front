import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './CardImage.css';

class CardImage extends Component {

    render() {
        const { image } = this.props;

        return (
            <div className={styles.container}>
                <img className={styles.image}
                    src={image}
                    alt="guess"
                />
            </div>
        )
    }

}

CardImage.propTypes = {
    image: PropTypes.string.isRequired
};

export default CardImage;