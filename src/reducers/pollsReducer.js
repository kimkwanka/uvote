/* const poll = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};*/

const polls = (state = [
  { question: 'Is Luigi a sexy Mofo?', options: ['Oh yeah', 'Please, no'], votes: [3, 7], author: 'quincy' },
  { question: 'Can you handle this?', options: ['I guess...', 'Maybe?', 'No way!'], votes: [5, 8, 2], author: 'quancy' },
], action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, { name: 'hello', val: action.val }];
    default:
      return state;
  }
};

export default polls;
