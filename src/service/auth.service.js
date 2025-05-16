import api from './axios';

export const AuthService = {
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      this.setToken(response.data.token);
      this.setRole(response.data.role);
    }
    return response.data;
  },

  async register(email, password, name, role = 'STUDENT') {
    const response = await api.post('/auth/registration', { 
      email, 
      password, 
      name,
      role 
    });
    if (response.data.token) {
      this.setToken(response.data.token);
      this.setRole(response.data.role);
    }
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

  getRole() {
    return localStorage.getItem('userRole');
  },

  setRole(role) {
    localStorage.setItem('userRole', role);
  },

  removeRole() {
    localStorage.removeItem('userRole');
  },

  logout() {
    this.removeToken();
    this.removeRole();
  },

  isAuthenticated() {
    return !!this.getToken();
  }
};

export default AuthService; 