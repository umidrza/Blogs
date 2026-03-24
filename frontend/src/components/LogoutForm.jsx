import { logoutUser } from '../reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { showNotification } from '../reducers/notificationReducer';
import { useNavigate } from 'react-router-dom';


const LogoutForm = () => {
  const user = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser())
    dispatch(showNotification(`Logout ${user.name}`));
    navigate('/');
  };

  return (
    <>
      <button
        className="btn btn-outline-danger btn-sm"
        onClick={handleLogout}
      >
        Logout
      </button>
    </>
  )
}

export default LogoutForm