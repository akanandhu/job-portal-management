import { Route, Routes } from "react-router";
import HomePage from "./pages/home-page";
import AuthPage from "./pages/auth-page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default App;
