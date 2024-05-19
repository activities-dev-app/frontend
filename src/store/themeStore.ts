import { Mode } from "@/context/ThemeContext";
import localforage from "localforage";

const store = localforage.createInstance({
    name: "themeStore"
});

export const getValue: () => Promise<Mode | null> = async () => {
    return await store.getItem("mode");
};

export const setValue: (theme: Mode) => Promise<Mode> = async (mode: Mode) => {
    return await store.setItem("mode", mode);
};


