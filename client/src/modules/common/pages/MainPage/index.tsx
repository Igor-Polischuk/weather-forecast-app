import { FC } from "react";
import { Navigate } from "react-router-dom";

export const MainPage: FC = () => {
  return <Navigate to="/weather"/>
};
