import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import { AppRoutes } from "./routes/routes";

const router = createBrowserRouter(AppRoutes);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
