"use client";

import { useTheme } from "@/context";
import Icon from "@/icons";

export default function Loading() {

    const { mode } = useTheme();

    return <div className={`loading loading--${mode}`}>
        <Icon icon="loader" className="spinning" />
    </div>
}