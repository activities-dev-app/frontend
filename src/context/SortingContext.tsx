"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { Category } from "@/types";

type ContextType = {
    sorted: (categories: Category[]) => Category[];
    sortType: SortType;
    setSortType: React.Dispatch<React.SetStateAction<SortType>>;
    sortedAlphabeticaly: (arr: any[], property: string) => void;
    sortedByDate: (arr: any[], property: string) => void;
};

type SortType = "date" | "a-z";

const defaultValue: ContextType = {
    sorted: () => [],
    sortType: "date",
    setSortType: () => { },
    sortedAlphabeticaly: () => { },
    sortedByDate: () => { },
};

const Context = createContext(defaultValue);

export default function SortingContext({ children }: { children: React.ReactNode }) {

    const [sortType, setSortType] = useState<SortType>("date");

    const sortedByDate = useCallback((arr: any[], property: string) => {
        arr.sort((a: any, b: any) => {
            return b[property] - a[property]
        });
    }, []);

    const sortedAlphabeticaly = useCallback((arr: any[], property: string) => {
        arr.sort((a: any, b: any) => {
            if (a[property] < b[property]) {
                return -1;
            } else if (a[property] > b[property]) {
                return 1;
            } else {
                return 0;
            }
        });
    }, []);

    const sorted = useCallback((categories: Category[]) => {
        switch (sortType) {
            case "a-z":
            //return sortedAlphabeticaly(categories);
            case "date":
            //return sortedByDate(categories);
            default:
                return categories;
        }
    }, [sortType,
        //sortedAlphabeticaly, sortedByDate
    ]);

    return (
        <Context.Provider value={{ sorted, sortType, setSortType, sortedAlphabeticaly, sortedByDate }}>
            {children}
        </Context.Provider>
    );
}

export const useSorting = () => useContext<ContextType>(Context);