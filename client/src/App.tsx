import { Route, Routes } from "react-router-dom";

import { AuthPage, MainPage } from "./pages";
import { PrivateRoute } from "./modules/auth/hoc/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <MainPage />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<AuthPage/>} />
    </Routes>
  );
}

export default App;
