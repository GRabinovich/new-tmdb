import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Función para guardar la información del usuario en localStorage
  const saveUserToLocalStorage = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Función para cargar la información del usuario desde localStorage
  const loadUserFromLocalStorage = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  };

  // Cargar el usuario al cargar la aplicación
  useEffect(() => {
    loadUserFromLocalStorage();
  }, []);

  const login = (userId, username) => {
    const userData = { userId, username };
    setUser(userData);
    // Guardar la información del usuario en localStorage
    saveUserToLocalStorage(userData);
  };

  const logout = () => {
    setUser(null);
    // Eliminar la información del usuario del localStorage al cerrar sesión
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};