export function createPoll(poll) {
  return {
    type: 'CREATE_POLL',
    poll,
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
