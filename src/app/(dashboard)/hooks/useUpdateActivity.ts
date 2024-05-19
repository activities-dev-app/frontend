"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useDataContext } from "../context";
import { useForm } from "@/context";
import { ActivityUpdates } from "@/types";

export const useUpdateActivity = (categoryId: string) => {

    const router = useRouter();

    const { fetchActivities, updateActivity } = useDataContext();

    const { setShowActivityUpdateForm } = useForm();

    const [updatingActivity, setUpdatingActivity] = useState<boolean>(false);

    const updateCurrentActivity = useCallback(({
        activityId,
        updates,
        errorCallback
    }: {
        activityId: string;
        updates: ActivityUpdates;
        errorCallback: (err: any) => void;
    }) => {
        setUpdatingActivity(true);
        updateActivity({ activityId, updates })
            .then(r => console.log("Updated activity: ", r))
            .then(() => fetchActivities({ revalidate: true }))
            .catch(err => errorCallback(err))
            .finally(() => {
                setUpdatingActivity(false);
                setShowActivityUpdateForm(false);
            });
    }, [
        fetchActivities,
        setShowActivityUpdateForm,
        updateActivity,
    ]);

    const cancelUpdate = useCallback(() => {
        setShowActivityUpdateForm(false);
    }, [setShowActivityUpdateForm]);

    return {
        updateActivity: updateCurrentActivity,
        updatingActivity,
        cancelUpdate,
    };
};