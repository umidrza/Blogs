import { useState } from 'react';

const LoginForm = ({ handleLogin  }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = (event) => {
    event.preventDefault();
    handleLogin({ username, password });
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="username">username</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input type="text" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm