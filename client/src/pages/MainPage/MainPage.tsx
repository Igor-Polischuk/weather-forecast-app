import { Link } from "react-router-dom";

export const MainPage = () => {
  return (
    <div>
      Main page
      <Link to="/auth"> Go to auth page</Link>
    </div>
  );
};
