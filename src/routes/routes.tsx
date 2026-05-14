import { lazy } from "react";
import { createRoutesFromElements, Navigate, Route } from "react-router";

// eager components
import AppLayout from "@/components/layout/AppLayout";
import AuthRoutes from "@/components/layout/AuthRoutes";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import RouterErrorFallback from "./RouterErrorFallback";

// lazy components
const ForgotPassword = lazy(() => import("@/pages/auth/ForgotPassword"));
const Login = lazy(() => import("@/pages/auth/Login"));
const Register = lazy(() => import("@/pages/auth/Register"));
const ResetPassword = lazy(() => import("@/pages/auth/ResetPassword"));
const VerificationEmailSent = lazy(
    () => import("@/pages/auth/VerificationEmailSent"),
);
const VerifyEmail = lazy(() => import("@/pages/auth/VerifyEmail"));

const Dashboard = lazy(() => import("@/pages/dashboard/Dashboard"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Profile = lazy(() => import("@/pages/profile/Profile"));
const ProjectDetails = lazy(() => import("@/pages/projects/ProjectDetails"));
const Projects = lazy(() => import("@/pages/projects/Projects"));
const Tasks = lazy(() => import("@/pages/tasks/Tasks"));
const ProcessInvitation = lazy(
    () => import("@/pages/projects/ProcessInvitaion"),
);

const AppRoutes = createRoutesFromElements(
    <Route element={<AppLayout />} errorElement={<RouterErrorFallback />}>
        <Route element={<ProtectedLayout />}>
            <Route index element={<Navigate to="dashboard" />} />

            <Route path="dashboard" element={<Dashboard />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:projectId" element={<ProjectDetails />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="profile" element={<Profile />} />
        </Route>

        <Route element={<AuthRoutes />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="verify-email" element={<VerifyEmail />} />
            <Route
                path="email-verification-sent"
                element={<VerificationEmailSent />}
            />
        </Route>

        <Route path="process-invitation" element={<ProcessInvitation />} />
        <Route path="*" element={<NotFound />} />
    </Route>,
);

export default AppRoutes;
