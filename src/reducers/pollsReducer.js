const poll = (state = {}, action) => {
  switch (action.type) {
    case 'VOTE_POLL': {
      const newVotes = state.votes.slice(0);
      const newVoterNames = (action.voterName) ?
                        state.voterNames.concat([action.voterName]) : state.voterNames.concat([]);
      const newVoterIPs = state.voterIPs.concat([action.voterIP]);
      newVotes[action.option] += 1;
      return Object.assign({}, state, {
        votes: newVotes,
        voterNames: newVoterNames,
        voterIPs: newVoterIPs,
      });
    }
    case 'ADD_POLL_OPT': {
      const newOptions = state.options.concat([action.option]);
      const newVotes = state.votes.concat([0]);
      return Object.assign({}, state, {
        options: newOptions,
        votes: newVotes,
      });
    }
    default:
      return state;
  }
};

const sortByPollID = (a, b) => (a.pID - b.pID);

const polls = (state = [
  // { question: 'Is Luigi a sexy Mofo???', options: ['Oh yeah', 'Please, no'], votes: [3, 7], author: 'quincy', voterIPs: ['::ffff:127.0.0.1'], voterNames: [] },
  // { question: 'What is the answer to life the universe and everything?', options: ['42', '43', 'Does not compute'], votes: [13, 7, 6], author: 'kimkwanka', voterIPs: [], voterNames: ['kimkwanka'] },
  // { question: 'Can you handle this?', options: ['I guess...', 'Maybe?', 'No way!'], votes: [5, 8, 2], author: 'quancy', voterIPs: [], voterNames: [] },
  // { question: 'Why did the chicken cross the street?', options: ['Personal reasons', 'Because it wanted to get to the other side', 'Beats me...'], votes: [3, 1, 6], author: 'kimkwanka', voterIPs: [], voterNames: [] },
], action) => {
  switch (action.type) {
    case 'ADD_POLL_OPT':
    case 'VOTE_POLL':
      return state.map(p => ((p.pID !== action.pollId) ? p : poll(p, action)));
    case 'DELETE_POLL': {
      console.log(action.pollId);
      let index = -1;
      for (let i = 0; i < state.length; i += 1) {
        if (state[i].pID === action.pollId) {
          index = i;
          break;
        }
      }
      console.log(index);
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1),
      ];
    }
    case 'CREATE_POLL':
      return [
        ...state.slice(0),
        action.poll,
      ].sort(sortByPollID);
    default:
      return state;
  }
};

export default polls;
