import axios from 'axios';

export const getRaffleFlashcards = (amount) => {

    return axios.get(`/flashcard/raffle/${amount}`);

}