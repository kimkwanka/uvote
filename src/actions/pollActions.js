export function addPoll(question, options) {
  return {
    type: 'ADD_POLL',
    question,
    options,
  };
}

export function deletePoll(pollId) {
  return {
    type: 'DELETE_POLL',
    pollId,
  };
}

export function votePoll(pollId, option) {
  return {
    type: 'VOTE_POLL',
    pollId,
    option,
  };
}
