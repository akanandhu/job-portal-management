import { Route, Routes } from "react-router";

import ListingsPage from "./pages/listings-page";
import HomePage from "./pages/home-page";
import LoginPage from "./pages/login-page";
import CandidateProfilePage from "./pages/candidate-profile-page";
import DashboardPage from "./pages/dashboard-page";
import RegisterPage from "./pages/register-page";
import { AuthSessionGate } from "./features/auth/components/guard/auth-session-gate";
import { GuestRoute } from "./features/auth/components/guard/guest-route";
import { ProfileCompletionRoute } from "./features/auth/components/guard/profile-completion-route";
import { RoleRoute } from "./features/auth/components/guard/role-route";

function App() {
  return (
    <AuthSessionGate>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />
        <Route
          path="/register"
          element={
            <GuestRoute>
              <RegisterPage />
            </GuestRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <RoleRoute allowedRoles={["USER"]}>
              <ProfileCompletionRoute>
                <CandidateProfilePage />
              </ProfileCompletionRoute>
            </RoleRoute>
          }
        />
        <Route path="/listing" element={<ListingsPage />} />
        <Route
          path="/dashboard"
          element={
            <RoleRoute allowedRoles={["ADMIN"]}>
              <DashboardPage />
            </RoleRoute>
          }
        />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </AuthSessionGate>
  );
}

export default App;
