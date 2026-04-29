import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useClearUser } from "../../hooks/useClearUser";
import { useNotification } from "../../hooks/useNotification";

const LogoutForm = () => {
  const clearUser = useClearUser();
  const notifyWith = useNotification();
  const navigate = useNavigate();

  const logout = async () => {
    clearUser();
    notifyWith("Logged out");
    navigate("/");
  };

  useEffect(() => {
    logout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default LogoutForm;