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
            <span className="navbar-text">
              <em>
                {user.name}
                <Link to="/logout">
                  <button className="btn btn-outline-danger btn-sm">
                    Logout
                  </button>
                </Link>
              </em>
            </span>
          ) : (
            <Link className="nav-link" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
