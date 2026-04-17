import AuthRoutes from "@/components/layout/AuthRoutes";
import NotFound from "@/components/layout/NotFound";
import RootLayout from "@/components/layout/RootLayout";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ResetPassword from "@/pages/auth/ResetPassword";
import VerificationEmailSent from "@/pages/auth/VerificationEmailSent";
import VerifyEmail from "@/pages/auth/VerifyEmail";
import Dashboard from "@/pages/dashboard/Dashboard";
import Profile from "@/pages/profile/Profile";
import ProjectDetails from "@/pages/projects/ProjectDetails";
import Projects from "@/pages/projects/Projects";
import Tasks from "@/pages/tasks/Tasks";
import { createRoutesFromElements, Navigate, Route } from "react-router";

export const AppRoutes = createRoutesFromElements(
    <Route>
        <Route element={<RootLayout />}>
            <Route index element={<Navigate to='dashboard' />} />

            <Route path='dashboard' element={<Dashboard />} />
            <Route path='projects' element={<Projects />} />
            <Route path='projects/:projectId' element={<ProjectDetails />} />
            <Route path='tasks' element={<Tasks />} />
            <Route path='profile' element={<Profile />} />
        </Route>

        <Route element={<AuthRoutes />}>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
            <Route path='reset-password' element={<ResetPassword />} />
            <Route path='verify-email' element={<VerifyEmail />} />
            <Route
                path='email-verification-sent'
                element={<VerificationEmailSent />}
            />
        </Route>

        <Route path='*' element={<NotFound />} />
    </Route>
);
