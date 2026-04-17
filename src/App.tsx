import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import "./App.css";
import AuthRoutes from "./components/layout/AuthRoutes";
import NotFound from "./components/layout/NotFound";
import ProtectedRoutes from "./components/layout/ProtectedRoutes";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ResetPassword from "./pages/auth/ResetPassword";
import VerificationEmailSent from "./pages/auth/VerificationEmailSent";
import VerifyEmail from "./pages/auth/VerifyEmail";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/profile/Profile";
import ProjectDetails from "./pages/projects/ProjectDetails";
import Projects from "./pages/projects/Projects";
import Tasks from "./pages/tasks/Tasks";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<ProtectedRoutes />}>
                    <Route index element={<Navigate to='dashboard' />} />

                    <Route path='dashboard' element={<Dashboard />} />
                    <Route path='projects' element={<Projects />} />
                    <Route
                        path='projects/:projectId'
                        element={<ProjectDetails />}
                    />
                    <Route path='tasks' element={<Tasks />} />
                    <Route path='profile' element={<Profile />} />
                </Route>

                <Route element={<AuthRoutes />}>
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                    <Route
                        path='forgot-password'
                        element={<ForgotPassword />}
                    />
                    <Route path='reset-password' element={<ResetPassword />} />
                    <Route path='verify-email' element={<VerifyEmail />} />
                    <Route
                        path='email-verification-sent'
                        element={<VerificationEmailSent />}
                    />
                </Route>

                <Route path='*' element={<NotFound />} />
            </Routes>

            <Toaster
                position='top-center'
                gutter={12}
                containerStyle={{ margin: "8px" }}
                toastOptions={{
                    success: {
                        duration: 3000,
                    },
                    error: {
                        duration: 5000,
                    },
                    style: {
                        fontSize: "16px",
                        maxWidth: "500px",
                        padding: "16px 24px",
                        backgroundColor: "#1a1a1a",
                        color: "#fff",
                    },
                }}
            />
        </BrowserRouter>
    );
}

export default App;
