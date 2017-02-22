export function login(name){
  return {
    type: "LOGIN_USER",
    name,
    loggedIn: true,
  }
};

export function logout(){
  return {
    type: "LOGOUT_USER",
    name: null,
    loggedIn: false,
  }
};