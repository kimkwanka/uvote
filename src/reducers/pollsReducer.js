const poll = (state = {}, action) => {
  const votesCopy = state.votes.slice(0);

  switch (action.type) {
    case 'VOTE_POLL':
      votesCopy[action.option] += 1;
      return Object.assign({}, state, { votes: votesCopy });
    default:
      return state;
  }
};

const polls = (state = [
  { question: 'Is Luigi a sexy Mofo???', options: ['Oh yeah', 'Please, no'], votes: [3, 7], author: 'quincy' },
  { question: 'What is the answer to life the universe and everything?', options: ['42', '43', 'Does not compute'], votes: [13, 7, 6], author: 'kimkwanka' },
  { question: 'Can you handle this?', options: ['I guess...', 'Maybe?', 'No way!'], votes: [5, 8, 2], author: 'quancy' },
  { question: 'Why did the chicken cross the street?', options: ['Personal reasons', 'Because it wanted to get to the other side', 'Beats me...'], votes: [3, 1, 6], author: 'kimkwanka' },
], action) => {
  switch (action.type) {
    case 'VOTE_POLL':
      return state.map((p, i) => ((i !== action.pollId) ? p : poll(p, action)));
    case 'DELETE_POLL':
      return [
        ...state.slice(0, action.pollId),
        ...state.slice(action.pollId + 1),
      ];
    case 'CREATE_POLL':
      return [
        ...state.slice(0),
        action.poll,
      ];
    default:
      return state;
  }
};

export default polls;
