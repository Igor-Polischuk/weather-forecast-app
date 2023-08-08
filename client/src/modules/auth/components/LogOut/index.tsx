import { useNavigate } from "react-router-dom";

import styles from "./styles.module.scss";
import { useLogOutMutation } from "@/gql";
import { currentCityVar } from "@/apollo/weather-vars";

export const LogOut = () => {
  const [logOut, { client }] = useLogOutMutation();
  const navigate = useNavigate();

  const logout = async () => {
    await logOut();
    await client.clearStore();
    currentCityVar('')
    navigate("/login");
  };

  return (
    <a className={styles.logOut} onClick={logout}>
      Log out
    </a>
  );
};
