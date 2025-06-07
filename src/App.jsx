import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

export const TodoContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <TodoContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </TodoContext.Provider>
  );
}

export default App;
