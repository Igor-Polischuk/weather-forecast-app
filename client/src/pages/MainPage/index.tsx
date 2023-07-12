import { useCurrentUserQuery } from "@/gql";
import { Link } from "react-router-dom";

export const MainPage = () => {
  const {data, error, loading} = useCurrentUserQuery();

  if (error) {
    return (
    <><div>{error.message}</div>
    <Link to="/login"> Go to auth page</Link></>
    )
  }

  if(loading){
    return <h1>LOADING....</h1>
  }

  return (
    <div>
      Main page
      <p>Hello {data?.me.email}</p>
      <Link to="/login"> Go to login page</Link>
    </div>
  );
};
