import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useCurrentUserQuery } from "@/gql";
import { Spin } from "antd";

export enum AccessLevel {
  AUTHORIZED = "authorized",
  UNAUTHORIZED = "unauthorized",
  PUBLIC = "public",
}

interface IRequireAuthProps {
  children: JSX.Element;
  access?: AccessLevel;
  role?: string[];
}

export const AccessControl: FC<IRequireAuthProps> = ({ children, access }) => {
  const { data, loading } = useCurrentUserQuery();
  const location = useLocation();

  if (loading) {
    return <Spin size="large" />;
  }

  if (access === AccessLevel.AUTHORIZED && !data) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (access === AccessLevel.UNAUTHORIZED && data) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
};
