"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useDataContext } from "../context";
import { useForm } from "@/context";

export const useAddActivity = () => {

    const router = useRouter();
    const { addActivity, fetchActivities } = useDataContext();
    const { setShowActivityForm } = useForm();
    const [addingActivity, setAddingActivity] = useState<boolean>(false);

    const addNewActivity = useCallback(async ({
        newActivity,
        errorCallback
    }: {
        newActivity: { categoryId: string, activityName: string, activityDescription: string, userId: string };
        errorCallback?: (err?: any) => void
    }) => {

        setAddingActivity(true);

        const { categoryId, activityName, activityDescription, userId } = newActivity;

        try {
            const response = await addActivity({ categoryId, activityName, activityDescription, userId });
            setAddingActivity(false);
            setShowActivityForm(false);
            return response;
        } catch (err) {
            errorCallback && errorCallback(err);
        }

    }, [addActivity, setShowActivityForm]);

    const cancelAddActivity = useCallback(() => {
        setShowActivityForm(false);
    }, [setShowActivityForm]);

    return {
        addActivity: addNewActivity,
        addingActivity,
        cancelAddActivity,
    };
};