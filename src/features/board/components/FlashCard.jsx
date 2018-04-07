import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import CardImage from './CardImage';
import CardWord from './CardWord';
import styles from './FlashCard.css';

class FlashCard extends Component {

    makeGuess(event) {
        event.preventDefault();
        this.props.makeGuess(this.props.flashCard.id, this.guess.value);
        this.guess.value = '';
    }

    render() {
        const { flashCard } = this.props;

        let showCard = {};
        let cardStyle = [styles.card];

        if(flashCard.hit === 0) {
            showCard = <CardImage image={flashCard.image} />;
        } else {
            showCard = <CardWord word={flashCard.word} hit={flashCard.hit} />;
            if(flashCard.hit < 0) {
                cardStyle.push(styles.miss);
            } else {
                cardStyle.push(styles.hit);
            }
        }

        return (
            <div className={cardStyle.join(' ')}>
                <div className={styles.imagecontainer}>
                    {showCard}
                </div>
                <div className={styles.formcontainer}>
                    <form className={styles.cardform} onSubmit={this.makeGuess.bind(this)}>
                        <input type='text' ref={input => this.guess = input} />
                        <button type="submit">
                            <FormattedMessage
                                id="board.card.guess"
                                defaultMessage="Guess" />
                        </button>
                    </form>
                </div>
            </div>
        )
    }

}

FlashCard.propTypes = {
    flashCard: PropTypes.object.isRequired
};

export default FlashCard;