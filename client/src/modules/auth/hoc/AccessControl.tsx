import { Navigate, useLocation } from "react-router-dom";
import { FC } from "react";

import { Loader } from "@modules/common/components/Loader";
import { AccessLevel } from "@/modules/auth/access-levels";
import { useCurrentUserQuery } from "@/gql";

interface IRequireAuthProps {
  children: JSX.Element;
  access?: AccessLevel;
  role?: string[];
}

export const AccessControl: FC<IRequireAuthProps> = ({ children, access }) => {
  const { data, loading } = useCurrentUserQuery({
    fetchPolicy: 'cache-only'
  });
  const location = useLocation();

  const isAuth = !!data?.currentUser;

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
