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

export function votePoll(pollId, option, voterName, voterIP) {
  return {
    type: 'VOTE_POLL',
    pollId,
    option,
    voterName,
    voterIP,
  };
}
