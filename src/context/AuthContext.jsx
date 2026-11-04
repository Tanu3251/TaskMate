import { createContext, useContext, useState } from 'react';
import { authService } from '../services/authService';

const Ctx = createContext();

export const useAuth = () => useContext(Ctx);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem('tm-user') || 'null')
  );

  const save = (response) => {
    const loggedInUser = response.user;
    const token = response.token;

    localStorage.setItem('token', token);
    localStorage.setItem('tm-user', JSON.stringify(loggedInUser));
    setUser(loggedInUser);
  };

  const login = async (data) => {
    const response = await authService.login(data);
    save(response);
  };

  const signup = async (data) => {
    const response = await authService.signup(data);
    save(response);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tm-user');
    setUser(null);
  };

  return (
    <Ctx.Provider value={{ user, login, signup, logout }}>
      {children}
    </Ctx.Provider>
  );
}