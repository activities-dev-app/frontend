import { useEffect, useRef } from "react";

export const useAutomaticCloseForm = (callback: () => void) => {

    const ref = useRef<HTMLFormElement>(null);

    useEffect(() => {

        const onClick = (e: MouseEvent) => {
            const currentRef = ref.current;

            if (currentRef) {
                if (currentRef.contains(e.target as Node)) {
                    return;
                } else {
                    callback();
                }
            }
        }

        const onEscape = (e: KeyboardEvent) => {
            const currentRef = ref.current;

            if (currentRef) {
                if (e.key === "Escape") {
                    callback();
                }
            }
        };

        document.body.addEventListener("click", onClick);
        window.addEventListener("keydown", onEscape);

        return () => {
            document.body.removeEventListener("click", onClick);
            window.removeEventListener("keydown", onEscape);
        }
    }, [callback]);

    return { ref }
};
