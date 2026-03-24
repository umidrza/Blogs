import { useField } from "../hooks/useField";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/userReducer";
import { showNotification } from "../reducers/notificationReducer";

const LoginForm = () => {
  const { reset: resetUsername, ...username } = useField("text");
  const { reset: resetPassword, ...password } = useField("password");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      loginUser({
        username: username.value,
        password: password.value,
      }),
    );

    if (loginUser.fulfilled.match(result)) {
      dispatch(
        showNotification(`Welcome ${result.payload.name}`, "success", 3),
      );
      navigate("/");
    } else {
      dispatch(showNotification("Wrong credentials", "error", 3));
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div
        className="card p-4 shadow-sm"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="mb-4 text-center">Log in to application</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input id="username" className="form-control" {...username} />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input id="password" className="form-control" {...password} />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
