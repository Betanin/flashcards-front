import axios from 'axios';

export const postFlashcard = (card) => {
    
    return axios.post(`/flashcard`, card);

}