import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router";
import LoadingIcon from "../common/LoadingIcon";
import ModalRegistry from "../modal/ModalRegistry";

function AppLayout() {
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

            <ModalRegistry />

            <Suspense fallback={<LoadingIcon />}>
                <Outlet />
            </Suspense>
        </>
    );
}

export default AppLayout;
