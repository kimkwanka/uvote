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
  { question: 'Can you handle this?', options: ['I guess...', 'Maybe?', 'No way!'], votes: [5, 8, 2], author: 'quancy' },
], action) => {
  switch (action.type) {
    case 'VOTE_POLL':
      return state.map((p, i) => ((i !== action.pollId) ? p : poll(p, action)));
    default:
      return state;
  }
};

export default polls;
