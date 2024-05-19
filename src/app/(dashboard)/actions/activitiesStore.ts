"use server";

import { dataApi } from "@/app/axiosInstance";
import { Activity, ActivityUpdates, NewActivity } from "@/types";
import { cache } from "react";

/* Fetch activities */
export const fetchActivities = cache(async (userId: string) => {
    return (
        await dataApi.get(`/activities/${userId}`)
    ).data as Activity[] | null;
});

export const fetchActivity = cache(async (activityId: string) => {
    return (
        await dataApi.get(`/activity/${activityId}`)
    ).data as Activity | null;
});

export const getActivitiesByCategoryId = (async (categoryId: string) => {
    return (
        await dataApi.get(`/activities?categoryId=${categoryId}`)
    ).data as Activity[];
});

/* Add activity */
export async function addActivity(activity: NewActivity) {
    return (
        await dataApi.post("/activities", activity)
    ).data as Activity;
}

/* Update activity */
export async function updateActivity({
    activityId, updates
}: {
    activityId: string, updates: ActivityUpdates
}) {
    return (
        await dataApi.put(`/activity/${activityId}`, updates)
    ).data as Activity;
}

/* Delete activity */
export async function deleteActivity(activityId: string) {
    return (
        await dataApi.delete(`/activity/${activityId}`)
    ).data as null;
}

/* Delete many activities */
export async function deleteManyActivities(ids: string[]) {
    console.log(ids);

    const promises = ids.map(id=> dataApi.delete(`/activity/${id}`));

    Promise.all([...promises]).then(function(values) {
        console.log(values);
    });
    return null;
}
