import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector(({ user }) => user);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 rounded shadow-sm p-3">
      <div className="container-fluid d-flex justify-content-between">
        <div className="d-flex gap-3">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/blogs">
            Blogs
          </Link>
          <Link className="nav-link" to="/users">
            Users
          </Link>
        </div>

        <div>
          {user ? (
            <span className="navbar-text d-flex align-items-center gap-2">
              <em>{user.name}</em>
              <Link to="/logout">
                <button className="btn btn-outline-danger btn-sm">
                  Logout
                </button>
              </Link>
            </span>
          ) : (
            <div className="d-flex gap-2">
              <Link className="nav-link" to="/login">
                Login
              </Link>
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
