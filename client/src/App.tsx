import { Route, Routes } from "react-router-dom";

import { AuthPage, MainPage } from "@/pages";
import { AccessControl, AccessLevel } from "@modules/auth";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AccessControl access={AccessLevel.AUTHORIZED}>
            <MainPage />
          </AccessControl>
        }
      />
      <Route
        path="/login"
        element={
          <AccessControl access={AccessLevel.UNAUTHORIZED}>
            <AuthPage />
          </AccessControl>
        }
      />
    </Routes>
  );
}

export default App;
