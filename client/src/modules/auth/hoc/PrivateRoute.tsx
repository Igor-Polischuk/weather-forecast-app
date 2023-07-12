// import useCheckAuth from "@/hooks/useCheckAuth";
import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useCurrentUserQuery } from "@/gql";

interface IRequireAuthProps {
  children: JSX.Element;
}

export const PrivateRoute: FC<IRequireAuthProps> = ({ children }) => {
  const {data, loading} = useCurrentUserQuery();
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