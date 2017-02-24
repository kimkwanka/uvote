const user = (state = {
  name: null,
}, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return {
        name: action.name,
        loggedIn: action.loggedIn,
      };
    case 'LOGOUT_USER':
      return {
        name: null,
        loggedIn: false,
      };
    default:
      return state;
  }
};

export default user;
