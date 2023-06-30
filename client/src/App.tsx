import { Route, Routes } from "react-router-dom";

import { AuthPage, MainPage } from "./pages";

import "./App.scss";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </div>
  );
}

export default App;
