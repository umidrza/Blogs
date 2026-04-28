import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Users = () => {
  const users = useSelector(({ users }) => users);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Users</h2>

      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
