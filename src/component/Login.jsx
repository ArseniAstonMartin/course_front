"use client"

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Authorization.css';
import AuthService from '../services/auth.service';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await AuthService.login(formData.email, formData.password);
      AuthService.setToken(response.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Произошла ошибка при входе');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">Вход</h2>
        
        <div className="auth-input-group">
          <input
            type="email"
            name="email"
            className="auth-input"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="auth-input-group">
          <input
            type="password"
            name="password"
            className="auth-input"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {error && <div className="auth-error">{error}</div>}

        <button type="submit" className="auth-button">
          Войти
        </button>

        <Link to="/signup" className="auth-link">
          Нет аккаунта? Зарегистрироваться
        </Link>
      </form>
    </div>
  );
};

export default Login;
