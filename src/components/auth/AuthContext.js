import React, { useState, createContext, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState('');
  const [users, setUsers] = useState([]); 

  const register = (username, email, password) => {
    const newUser = { username, email, password };

    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      setAuthError('User with this email already exists.');
      return false;
    }

    setUsers((prevUsers) => [...prevUsers, newUser]);
    setAuthError('');
    console.log('Registered Users:', [...users, newUser]);
    return true;
  };

  const login = (email, password) => {
    const foundUser = users.find((user) => user.email === email && user.password === password);

    if (foundUser) {
      setUser({ email });
      setAuthError('');
      console.log("User logged in:", email);
      return true; 
    } else {
      setAuthError('Invalid credentials. Please try again.');
      return false; 
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, authError }}>
      {children}
    </AuthContext.Provider>
  );
};
