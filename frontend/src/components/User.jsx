import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../reducers/usersReducer";
import { useEffect } from "react";

const User = () => {
  const users = useSelector((state) => state.users);
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const user = users.find((user) => user.id === id);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      {user && (
        <div className="mb-4">
          <h2>{user.name}'s User Blogs</h2>
          <p className="text-muted">{user.username}</p>
        </div>
      )}

      <div className="row">
        {user.blogs.length > 0 ? (
          user.blogs.map((blog) => (
            <div className="col-md-6 mb-4" key={blog.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{blog.title}</h5>
                  <p className="card-text">{blog.author}</p>
                </div>
                <div className="card-footer text-muted">Blog ID: {blog.id}</div>
              </div>
            </div>
          ))
        ) : (
          <p>No blogs found for this user.</p>
        )}
      </div>
    </div>
  );
};

export default User;
