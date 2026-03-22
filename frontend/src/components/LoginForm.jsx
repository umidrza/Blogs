import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  const submit = (event) => {
    event.preventDefault();
    handleLogin({ username, password });
    navigate('/')
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="mb-4 text-center">Log in to application</h2>

        <form onSubmit={submit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm