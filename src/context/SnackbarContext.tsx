"use client";

import {
    createContext,
    useContext,
    useState,
    ReactNode,
} from "react";

import {
    Snackbar,
    Alert,
} from "@mui/material";

type SnackbarSeverity =
    | "success"
    | "error"
    | "warning"
    | "info";

type SnackbarContextType = {
    showSnackbar: (
        message: string,
        severity?: SnackbarSeverity
    ) => void;
};

const SnackbarContext =
    createContext<SnackbarContextType | null>(
        null
    );

export function SnackbarProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [open, setOpen] =
        useState(false);

    const [message, setMessage] =
        useState("");

    const [severity, setSeverity] =
        useState<SnackbarSeverity>(
            "success"
        );

    const showSnackbar = (
        text: string,
        type: SnackbarSeverity = "success"
    ) => {
        setMessage(text);

        setSeverity(type);

        setOpen(true);
    };

    return (
        <SnackbarContext.Provider
            value={{
                showSnackbar,
            }}
        >
            {children}

            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() =>
                    setOpen(false)
                }
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
            >
                <Alert
                    onClose={() =>
                        setOpen(false)
                    }
                    severity={severity}
                    variant="filled"
                    sx={{
                        width: "100%",
                        borderRadius: 3,
                        fontWeight: 600,
                    }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
}

export function useSnackbar() {
    const context =
        useContext(SnackbarContext);

    if (!context) {
        throw new Error(
            "useSnackbar must be used inside SnackbarProvider"
        );
    }

    return context;
}