"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Mode = "light" | "dark";

import { themeStore } from "@/store";

type ContextType = {
    mode: Mode;
    setMode: React.Dispatch<React.SetStateAction<Mode>>;
};

const defaultValue: ContextType = {
    mode: "light",
    setMode: () => { },
};

const Context = createContext<ContextType>(defaultValue);

export default function ThemeContext({ children }: { children: React.ReactNode }) {

    const [mode, setMode] = useState<Mode>("light");

    useEffect(() => {
        themeStore.getValue()
            .then(defaultTheme => {
                console.log(defaultTheme)
                if (defaultTheme) {
                    setMode(defaultTheme);
                }
            })
            .catch(err => console.log(err));
    }, [setMode]);

    useEffect(() => {
        if (mode) {
            themeStore.setValue(mode);
        }
    }, [mode]);

    return (
        <Context.Provider value={{ mode, setMode }}>
            {children}
        </Context.Provider>
    );
}

export const useTheme = () => useContext<ContextType>(Context);