import { createContext, useReducer } from "react";

const AuthContext = createContext();

const intialState = {
  user: null,
  isAthenticated: false,
};

function authReduser(state, action) {
  switch (action.type) {
    case "logon":
      return { user: action.payload, isAthenticated: true };
    case "logout":
      return { user: null, isAthenticated: false };
    default:
      throw new Error("Unknown action");
  }
}

const FAKE_USER = {
  name: "Sajjad",
  email: "sajjad021.5555@gmail.com",
  password: "1234",
};

function AuthContextProvider({ children }) {
  const [{ user, isAthenticated }, dispatch] = useReducer(
    authReduser,
    intialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
