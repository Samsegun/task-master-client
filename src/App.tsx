import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import { AppRoutes } from "./routes/routes";

const router = createBrowserRouter(AppRoutes);

function App() {
    return (
        <>
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
            <RouterProvider router={router} />
        </>
    );
}

export default App;
