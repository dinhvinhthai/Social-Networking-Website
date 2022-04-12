import { createContext } from "react";
import io from "socket.io-client";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const socket = io.connect("http://localhost:5000");
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
