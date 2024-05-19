"use client";

import { createContext, useContext, useState } from "react";
import { Activity } from "@/types";

type SelectionContextType = {
    selectedActivity: Activity | undefined;
    setSelectedActivity: React.Dispatch<React.SetStateAction<Activity | undefined>>;
};

const SelectionContext = createContext<SelectionContextType>({
    selectedActivity: undefined,
    setSelectedActivity: () => { },
});

export const useActivitySelection = () => useContext<SelectionContextType>(SelectionContext);

export default function ActivitySelectionContext({ children }: { children: React.ReactNode }) {

    const [selectedActivity, setSelectedActivity] = useState<Activity>();

    const value: SelectionContextType = { selectedActivity, setSelectedActivity };

    return (
        <SelectionContext.Provider value={value}>
            {children}
        </SelectionContext.Provider>
    );
}
