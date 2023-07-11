import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_CURRENT_USER } from "../../graphql/query.graphql";

export const MainPage = () => {
  const {data, error, loading} = useQuery(GET_CURRENT_USER);

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
      <p>Hello {data.me.email}</p>
      <Link to="/login"> Go to login page</Link>
    </div>
  );
};
