import api from './axios';

export const AuthService = {
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  async register(email, password, name, role = 'STUDENT') {
    const response = await api.post('/auth/registration', { 
      email, 
      password, 
      name,
      role 
    });
    return response.data;
  },

  async getUserInfo() {
    const response = await api.get('/auth/info');
    return response.data;
  },

  getToken() {
    return localStorage.getItem('token');
  },

  setToken(token) {
    localStorage.setItem('token', token);
  },

  removeToken() {
    localStorage.removeItem('token');
  },

  isAuthenticated() {
    return !!this.getToken();
  }
};

export default AuthService; 