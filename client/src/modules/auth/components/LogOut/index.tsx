import { useLogOutMutation } from "@/gql";
import { useNavigate } from "react-router-dom";
import { isClickedLogOut } from "@/apollo/user-vars";
import { currentCityVar } from "@/apollo/weather-vars";

import styles from "./styles.module.scss";

export const LogOut = () => {
  const [logOut, {client}] = useLogOutMutation();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await logOut();
      isClickedLogOut(true);
      await client.clearStore()
      currentCityVar('')
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
