import AppProviders from "@/providers/AppProviders";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router";
import ModalRegistry from "../modal/ModalRegistry";

export function ProvidersLayout() {
    return (
        <AppProviders>
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

            <ModalRegistry />

            <Outlet />
        </AppProviders>
    );
}
