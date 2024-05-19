"use client";

import { useTheme } from "@/context";

export default function Page() {

    const { mode } = useTheme();

    return (
        <div className={`dashboard-home dashboard-home--${mode}`}>
            <div className="dashboard-home__featured">
                This is the Dashboard home
            </div>
        </div>
    );
}