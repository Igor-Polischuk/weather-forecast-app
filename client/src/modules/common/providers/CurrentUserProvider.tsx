import { useCurrentUserQuery } from "@/gql";
import { FC } from "react";
import { Loader } from "../components/Loader";

export const CurrentUserProvider: FC<{children: JSX.Element}> = ({children}) => {
  const {loading} = useCurrentUserQuery();

  if (loading) {
    return <Loader/>
  }

  return children
};