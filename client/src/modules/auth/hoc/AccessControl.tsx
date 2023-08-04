import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useCurrentUserQuery } from "@/gql";
import { useReactiveVar } from "@apollo/client";
import { isClickedLogOut } from "@/apollo/user-vars";
import { AccessLevel } from "..";
import { Loader } from "@/modules/common/components/Loader";

interface IRequireAuthProps {
  children: JSX.Element;
  access?: AccessLevel;
  role?: string[];
}

export const AccessControl: FC<IRequireAuthProps> = ({ children, access }) => {
  const { data, loading } = useCurrentUserQuery();
  const wasClickedLogOut = useReactiveVar(isClickedLogOut);
  const location = useLocation();

  const isAuth = data?.currentUser && !wasClickedLogOut;

  if (loading) {
    return <Loader />;
  }

  if (access === AccessLevel.AUTHORIZED && !isAuth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (access === AccessLevel.UNAUTHORIZED && isAuth) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
};
