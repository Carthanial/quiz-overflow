import * as types from '../actions/actionTypes';
/* initialState.card is a dummy value. Needs to be changed when backend connected */
const initialState = {
  card: { question: 'This will be a question.',
          choices: [
            {_id: 1, text: 'string1', is_correct: true},
            {_id: 2, text: 'string2', is_correct: false},
            {_id: 3, text: 'string3', is_correct: false},
            {_id: 4, text: 'string4', is_correct: false}
            ],
        },
  highScore: 0,
  currentScore: 0,
  cardsThisSession: 1,
  correctAnswers: 0,
};/* ^^^^^^^^ */
/*  ^^^^^^^^ Keeping correctAnswers and cardsThisSession as a reminder to create better score logic */
const quizReducer = (state = initialState, action) => {

    switch(action.type){
        case types.CORRECT_CHOICE: {
          console.log('correct at reducer')
          let correctAnswers = state.correctAnswers + action.payload;
          let currentScore = state.currentScore + action.payload;
          let highScore;
          if(currentScore > state.highScore)  highScore = currentScore;
            return {
                ...state,
                correctAnswers,
                currentScore,
                highScore, 
            }
        }
        case types.NEW_CARD_RECEIVED: {
          let card = action.payload
          let cardsThisSession = state.cardsThisSession + 1;
              return{
                ...state,
                card,
                cardsThisSession,
              }
            }
        case types.NEW_CARD_REQUEST: {
          return {...state}
        }
        default:{
            return {...state}
        }
    };
  };

export default quizReducer;

