import "./App.css";
import { useEffect, useReducer } from "react";
import AppRouter from "./shared/components/AppRouter";
import { authReducer } from "./modules/auth/authReducer";
import { AuthContext } from "./modules/auth/authContext";

const init = () => {
  return JSON.parse(localStorage.getItem("user")) || { isLogged: false };
};

function App() {
  const [user, dispatch] = useReducer(authReducer, {}, init);
  useEffect(() => {
    if (!user) return;
    const role = user.role || ""; // Asegúrate de que role no sea nulo
    const roleDefine = role.replace(/^"(.*)"$/, "$1");
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("userRole", roleDefine);
    localStorage.setItem("letter_size", JSON.stringify(user.letter_size));
    localStorage.setItem("darkMode", JSON.stringify(user.dark_theme));
  }, [user]);
  return (
    <AuthContext.Provider value={{ dispatch, user }}>
      <AppRouter />
    </AuthContext.Provider>
  );
}

export default App;
