import { Route, Routes } from "react-router-dom";

import { AccessControl, AccessLevel, AuthPage } from "@modules/auth";
import { MainPage } from "@modules/common/pages";

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
