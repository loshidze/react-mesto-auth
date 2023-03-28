import React from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function resetForm() {
    setPassword('');
    setEmail('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({password, email});
    resetForm();
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value)
  }

  function handleChangePassword(e) {
    setPassword(e.target.value)
  }

  return (
    <div className='auth'>
      <h2 className='auth__title'>Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit} action="#" noValidate>
        <fieldset className='auth__fieldset'>
          <input className="auth__input" value={email} onChange={handleChangeEmail} id="email" type="email" name="email" placeholder="Email" required/>
          <input className="auth__input" value={password} onChange={handleChangePassword} id="password" type="password" name="password" placeholder="Пароль" required/>
          <button className="auth__button" type="submit">Зарегистрироваться</button>
          <Link to='/log-in' className='auth__link'>Уже зарегистрированы? Войти</Link>
        </fieldset>
      </form>
    </div>
  )
}

export default Register;
