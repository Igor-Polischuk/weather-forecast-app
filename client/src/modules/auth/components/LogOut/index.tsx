import { useNavigate } from "react-router-dom";

import { currentCityVar } from "@/modules/weather/vars/city-vars";
import { useLogOutMutation } from "@/gql";

import styles from "./styles.module.scss";

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
