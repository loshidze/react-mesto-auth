import React from 'react';

function Login({ onLogin }) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function resetForm() {
    setEmail('');
    setPassword('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({email, password});
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
      <h2 className='auth__title'>Вход</h2>
      <form onSubmit={handleSubmit} className="auth__form" action="#" noValidate>
        <fieldset className='auth__fieldset'>
          <input className="auth__input" value={email} onChange={handleChangeEmail} id="email" type="email" name="email" placeholder="Email" required/>
          <input className="auth__input" value={password} onChange={handleChangePassword} id="password" type="password" name="password" placeholder="Пароль" required/>
          <button className="auth__button" type="submit">Войти</button>
        </fieldset>
      </form>
    </div>
  )
}

export default Login;
