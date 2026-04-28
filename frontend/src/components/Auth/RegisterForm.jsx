import { useField } from "../../hooks/useField";
import { useNavigate, Link } from "react-router-dom";
import { useNotification } from "../../hooks/useNotification";
import usersService from "../../services/users";

const RegisterForm = () => {
  const username = useField("text");
  const name = useField("text");
  const password = useField("password");
  const confirmPassword = useField("password");

  const navigate = useNavigate();
  const notify = useNotification();

  const handleRegister = async (event) => {
    event.preventDefault();

    if (password.value !== confirmPassword.value) {
      notify("Passwords do not match", "error");
      return;
    }

    if (password.value.length < 6) {
      notify("Password must be at least 6 characters long", "error");
      return;
    }

    try {
      await usersService.create({
        username: username.value,
        name: name.value,
        password: password.value,
      });

      notify(`User ${username.value} registered successfully`, "success", 3);
      navigate("/login");
    } catch (error) {
      const errorMessage = error.error || error.message || "Registration failed";
      notify(errorMessage, "error");
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div
        className="card p-4 shadow-sm"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="mb-4 text-center">Register</h2>

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input id="username" className="form-control" {...username} />
          </div>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input id="name" className="form-control" {...name} />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input id="password" className="form-control" {...password} />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              className="form-control"
              {...confirmPassword}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>

        <div className="text-center mt-3">
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
