"use client";

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {

    useEffect(() => {
        console.log(error);
    }, [error]);

    return (
        <div className="error">
            <h2>Something went wrong!</h2>
            <button
                className="button button__error"
                onClick={reset}
            >
                Reload page
            </button>
        </div>
    );
}