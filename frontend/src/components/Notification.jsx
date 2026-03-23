import { useSelector } from 'react-redux'

const Notification = () => {
  const notifications = useSelector(state => state.notifications);

  if (!notifications.length) return null;

  return (
    <>
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`mt-3 alert ${
            n.type === "error" ? "alert-danger" : "alert-success"
          }`}
        >
          {n.message}
        </div>
      ))}
    </>
  );
};

export default Notification;
