"use client";

import { Filter, useTheme } from "@/context";
import { useRegexReplacement } from "@/context/FilterContext";


export default function FilterComponent() {
    const { value, setValue } = useRegexReplacement();
    const { mode } = useTheme();

    return (
        <Filter
            id="category-filter"
            mode={mode}
            placeholder="search"
            value={value}
            setValue={setValue}
        />
    );
}