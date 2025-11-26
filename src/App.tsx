import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import "./App.css";
import AuthRoutes from "./components/layout/AuthRoutes";
import ProtectedRoutes from "./components/layout/ProtectedRoutes";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route element={<ProtectedRoutes />}>
                        <Route index element={<Navigate to='dashboard' />} />

                        <Route path='dashboard' element={<Dashboard />} />
                    </Route>

                    <Route element={<AuthRoutes />}>
                        <Route path='login' element={<Login />} />
                        <Route path='register' element={<Register />} />
                    </Route>
                </Routes>
            </BrowserRouter>

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
        </QueryClientProvider>
    );
}

export default App;
