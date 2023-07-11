// import useCheckAuth from "@/hooks/useCheckAuth";
import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../../../graphql/query.graphql";

interface IRequireAuthProps {
  children: JSX.Element;
}

export const PrivateRoute: FC<IRequireAuthProps> = ({ children }) => {
  const { loading, data } = useQuery(GET_CURRENT_USER);
  const location = useLocation();
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (data) ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};