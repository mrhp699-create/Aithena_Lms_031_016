import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../services/api';
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || 'null'));
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');
  useEffect(() => { if (!token) return; api.get('/auth/me').then(({ data }) => { setUser(data.user); localStorage.setItem('user', JSON.stringify(data.user)); }).catch(() => logout()); }, []);
  const login = async values => { setLoading(true); try { const { data } = await api.post('/auth/login', values); localStorage.setItem('token', data.token); localStorage.setItem('user', JSON.stringify(data.user)); setUser(data.user); return data.user; } finally { setLoading(false); } };
  const register = async values => { setLoading(true); try { const { data } = await api.post('/auth/register', values); localStorage.setItem('token', data.token); localStorage.setItem('user', JSON.stringify(data.user)); setUser(data.user); return data.user; } finally { setLoading(false); } };
  const logout = () => { localStorage.removeItem('token'); localStorage.removeItem('user'); setUser(null); };
  const value = useMemo(() => ({ user, loading, isAuthenticated: Boolean(user), login, register, logout }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = () => useContext(AuthContext);
