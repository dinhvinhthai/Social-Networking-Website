import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Profile from "./pages/Profile/Profile";
import Event from "./pages/event/Event";
import "./app.scss";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Main from "./Main";
import { SocketContextProvider } from "./context/SocketContext";
import { UserContextProvider } from "./context/userContext";
const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [localStorage.getItem("token")]);

  return (
    <div className="app">
      {token ? (
        <UserContextProvider>
          <SocketContextProvider>
            <Main />
          </SocketContextProvider>
        </UserContextProvider>
      ) : (
        <Routes>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="*" element={<Login />}></Route>
        </Routes>
      )}
    </div>
  );
};

export default App;
