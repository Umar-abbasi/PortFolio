import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => sessionStorage.getItem('admin_token'));

  function login(newToken) {
    sessionStorage.setItem('admin_token', newToken);
    setToken(newToken);
  }

  function logout() {
    sessionStorage.removeItem('admin_token');
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, isAuthed: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
