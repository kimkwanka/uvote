const poll = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

const polls = (state = [], action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, {name:'hello', val: action.val}];
      break;
    default:
      return state;
      break;
  }
}

export default polls;
