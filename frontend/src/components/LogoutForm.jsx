
const LogoutForm = ({ handleLogout }) => {

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