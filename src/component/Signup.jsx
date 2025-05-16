"use client"

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Authorization.css';
import AuthService from '../services/auth.service';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'STUDENT'
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
      const response = await AuthService.register(
        formData.email,
        formData.password,
        formData.name,
        formData.role
      );
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Произошла ошибка при регистрации');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">Регистрация</h2>
        
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

        <div className="auth-input-group">
          <input
            type="text"
            name="name"
            className="auth-input"
            placeholder="Имя"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="auth-input-group">
          <select
            name="role"
            className="auth-input"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="STUDENT">Студент</option>
            <option value="TEACHER">Преподаватель</option>
          </select>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <button type="submit" className="auth-button">
          Зарегистрироваться
        </button>

        <Link to="/login" className="auth-link">
          Уже есть аккаунт? Войти
        </Link>
      </form>
    </div>
  );
};

export default Signup;
