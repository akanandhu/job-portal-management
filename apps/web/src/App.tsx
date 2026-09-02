import { Route, Routes } from "react-router";
import HomePage from "./pages/home-page";
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default App;
