import { useLogOutMutation } from "@/gql";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { isClickedLogOut } from "@/apollo/user-vars";

export const LogOut = () => {
  const [logOut] = useLogOutMutation();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await logOut();
      localStorage.removeItem("token");
      isClickedLogOut(true);
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <a className={styles.logOut} onClick={logout}>
      Log out
    </a>
  );
};
