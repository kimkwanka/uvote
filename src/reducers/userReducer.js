const user = (state = {
  loggedIn: false,
  name: null,
}, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return { 
        name: action.name,
        loggedIn: action.loggedIn
      };
      break;
    case 'LOGOUT_USER':
      return { 
        name: null,
        loggedIn: false,
      };
      break;
    default:
      return state;
  }
};

export default user;
