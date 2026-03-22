
const Notification = ({ message, type }) => {
  if (!message) return null;

  const alertClass =
    type === "error" ? "alert alert-danger" : "alert alert-success";

  return (
    <div className={`${alertClass} mt-3`} role="alert">
      {message}
    </div>
  );
};

export default Notification;