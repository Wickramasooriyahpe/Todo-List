import React, { useState, createContext, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [authError, setAuthError] = useState(''); 
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    const savedUser = localStorage.getItem('loggedInUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const register = (username, email, password) => {
    const newUser = { username, email, password };
    const storedUsers = localStorage.getItem('users');
    const parsedUsers = storedUsers ? JSON.parse(storedUsers) : [];
    const existingUser = parsedUsers.find((user) => user.email === email);

    if (existingUser) {
      setAuthError('User with this email already exists.');
      return false;
    }

    const updatedUsers = [...parsedUsers, newUser];
    setUsers(updatedUsers); 
    localStorage.setItem('users', JSON.stringify(updatedUsers)); 
    setAuthError(''); 
    console.log('Registered Users:', updatedUsers);
    return true;
  };

  const login = (email, password) => {
    const foundUser = users.find((user) => user.email === email && user.password === password);

    if (foundUser) {
      setUser({ email });
      localStorage.setItem('loggedInUser', JSON.stringify({ email })); 
      setAuthError('');
      console.log('User logged in:', email);
      return true;
    } else {
      setAuthError('Invalid credentials. Please try again.');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('loggedInUser'); 
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, authError }}>
      {children}
    </AuthContext.Provider>
  );
};
