"use client";

import { createContext, useCallback, useContext, useState } from "react";

type ContextType = {
    showConfirmDialog: boolean;
    setShowConfirmDialog: React.Dispatch<React.SetStateAction<boolean>>;
    message: string;
    openDialog: (message: string, callback?: (arg?: any) => void) => void;
    confirm: (value: boolean) => void;
};

const defaultValue: ContextType = {
    showConfirmDialog: false,
    setShowConfirmDialog: () => { },
    message: "",
    openDialog: () => { },
    confirm: () => { },
};

const Context = createContext<ContextType>(defaultValue);

export default function ModalContext({ children }: { children: React.ReactNode }) {
    return (
        <Context.Provider value={{ ...useDialog() }}>
            {children}
        </Context.Provider>
    );
}

const useDialog = () => {

    const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [callback, setCallback] = useState<(arg?: any) => void>();

    const openDialog = useCallback((message: string, callback?: () => void) => {
        setShowConfirmDialog(true);
        message && setMessage(message);
        callback && setCallback(() => callback); /* https://stackoverflow.com/a/55621679/11704817 */
    }, [setShowConfirmDialog, setMessage]);

    const confirm = useCallback((value: boolean) => {
        if (value === true) {
            callback && callback();
        }
    }, [callback]);

    return {
        showConfirmDialog,
        setShowConfirmDialog,
        message,
        openDialog,
        confirm,
    };
};

export const useModal = () => useContext<ContextType>(Context);
