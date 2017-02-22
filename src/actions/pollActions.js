export function addPoll(question, options){
  return {
    type: "ADD_POLL",
    question,
    options,
  }
};