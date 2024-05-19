"use client";

import { useParams } from "next/navigation";
import { useDataContext } from "../context";

export const useActivity = () => {

    const { id } = useParams<{ id: string }>();
    const { activities } = useDataContext();

    return { 
        activity: activities.filter(activity => activity.key === id)[0]
    };
};