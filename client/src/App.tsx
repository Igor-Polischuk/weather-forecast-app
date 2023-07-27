import { Route, Routes } from "react-router-dom";

import { AccessControl, AccessLevel, AuthPage } from "@modules/auth";
import { MainPage, NotFound } from "@modules/common/pages";
import { WeatherPage } from "@modules/weather";

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
      <Route
        path="/weather"
        element={
          <AccessControl access={AccessLevel.AUTHORIZED}>
            <WeatherPage />
          </AccessControl>
        }
      />
      <Route
        path="*"
        element={
          <NotFound />
        }
      />
    </Routes>
  );
}

export default App;
