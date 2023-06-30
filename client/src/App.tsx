import { Route, Routes } from "react-router-dom";

import { AuthPage, MainPage } from "./pages";

import "./App.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
}

export default App;
