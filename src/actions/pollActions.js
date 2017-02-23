export function addPoll(question, options) {
  return {
    type: 'ADD_POLL',
    question,
    options,
  };
}

export function deletePoll(question, options) {
  return {
    type: 'DELETE_POLL',
    question,
    options,
  };
}
