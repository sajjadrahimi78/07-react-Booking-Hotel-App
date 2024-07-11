import { createContext, useContext, useReducer } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();

const intialState = {
  user: null,
  isAuthenticated: false,
};

function authReducer(state, action) {
  switch (action.type) {
    case "logon":
      return { user: action.payload, isAuthenticated: true };
    case "logout":
      return { user: null, isAuthenticated: false };
    default:
    //   toast.error("This is an error!");
      throw new Error("Unknown action!");
  }
}

const FAKE_USER = {
  name: "Sajjad",
  email: "sajjad021.5555@gmail.com",
  password: "1234",
};


function AuthProvider({ children }) {
    const [{ user, isAuthenticated }, dispatch] = useReducer(
        authReducer,
        intialState
      );

  console.log(user);
  
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export function useAuth() {
  return useContext(AuthContext);
}
