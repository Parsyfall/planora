import React, { useState } from 'react'
import './LoginSignup.css'
import user_icon from '../Assets/user.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/locked-computer.png'

const InputField = ({ icon, type, placeholder, field, value, error, onChange }) => (
  <div className="input-wrapper">
    <div className={`input ${error ? 'input-error' : value && !error ? 'input-valid' : ''}`}>
      <img src={icon} alt="" />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(field, e.target.value)}
      />
    </div>
    {error && <span className="error-msg">⚠ {error}</span>}
  </div>
);

const LoginSignup = () => {
  const [action, setAction] = useState("login");

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '',
    phone: '', password: '', role: ''
  });

  const [errors, setErrors] = useState({});

  const validateField = (field, value) => {
    let message = '';

    if (field === 'firstName' || field === 'lastName') {
      if (value.trim().length < 2) message = 'Minim 2 caractere.';
    }
    if (field === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        message = 'Adresă de email invalidă.';
    }
    if (field === 'phone') {
      if (!/^\+?[0-9]{10,15}$/.test(value.replace(/\s/g, '')))
        message = 'Număr de telefon invalid.';
    }
    if (field === 'password') {
      if (value.length < 8) message = 'Parola trebuie să aibă minim 8 caractere.';
      else if (!/[A-Z]/.test(value)) message = 'Adaugă cel puțin o literă mare.';
      else if (!/[0-9]/.test(value)) message = 'Adaugă cel puțin o cifră.';
    }
    if (field === 'role') {
      if (!value) message = 'Te rugăm să selectezi un tip de cont.';
    }

    setErrors(prev => ({ ...prev, [field]: message }));
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const switchToSignup = () => {
    setAction("signup");
    setFormData({ firstName: '', lastName: '', email: '', phone: '', password: '', role: '' });
    setErrors({});
  };

  const switchToLogin = () => {
    setAction("login");
    setFormData({ firstName: '', lastName: '', email: '', phone: '', password: '', role: '' });
    setErrors({});
  };

  return (
    <div className='container'>
      <div className="stars"></div>

      <div className="header">
        <div className="text">{action === "login" ? "Log In" : "Sign Up"}</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        {action === "signup" && (
          <div className="input-row">
            <InputField
              icon={user_icon} type="text" placeholder="Nume"
              field="lastName" value={formData.lastName}
              error={errors.lastName} onChange={handleChange}
            />
            <InputField
              icon={user_icon} type="text" placeholder="Prenume"
              field="firstName" value={formData.firstName}
              error={errors.firstName} onChange={handleChange}
            />
          </div>
        )}

        <InputField
          icon={email_icon} type="email" placeholder="Email"
          field="email" value={formData.email}
          error={errors.email} onChange={handleChange}
        />

        {action === "signup" && (
          <InputField
            icon={user_icon} type="tel" placeholder="Număr de telefon"
            field="phone" value={formData.phone}
            error={errors.phone} onChange={handleChange}
          />
        )}

        {action === "signup" && (
          <div className="role-container">
            <label className={`role-option ${formData.role === 'organizator' ? 'role-active' : ''}`}>
              <input
                type="radio"
                name="role"
                value="organizator"
                checked={formData.role === 'organizator'}
                onChange={e => handleChange('role', e.target.value)}
              />
              🎯 Organizator
            </label>
            <label className={`role-option ${formData.role === 'invitat' ? 'role-active' : ''}`}>
              <input
                type="radio"
                name="role"
                value="invitat"
                checked={formData.role === 'invitat'}
                onChange={e => handleChange('role', e.target.value)}
              />
              🎟️ Invitat
            </label>
            {errors.role && <span className="error-msg">⚠ {errors.role}</span>}
          </div>
        )}

        <InputField
          icon={password_icon} type="password" placeholder="Parolă"
          field="password" value={formData.password}
          error={errors.password} onChange={handleChange}
        />
      </div>

      {action === "login" && (
        <div className="forgot-password">
          Parolă uitată? <span>Click aici!</span>
        </div>
      )}

      <div className='submit-container'>
        <div className={action === "signup" ? "submit active" : "submit"} onClick={switchToSignup}>
          Sign Up
        </div>
        <div className={action === "login" ? "submit active" : "submit"} onClick={switchToLogin}>
          Log In
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;