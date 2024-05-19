"use server";

import { cache } from "react";
import { dataApi } from "@/app/axiosInstance";
import type { ActivityObjectsOrdering, ActivityObjectsOrderingData, CodeData, CodeSandboxData, CodeUpdates, ImageUpdates, LatexData, LatexUpdates, LinkData, LinkUpdates, NewObject, ObjectInstanceType, ObjectType, ObjectsOrdering, QuillData, QuillUpdates, TextData, TextUpdates, codeSandboxUpdates } from "@/types";


/* Fetch objects */
export const fetchObjects = cache(async (userId: string) => {
    return (
        await dataApi.get(`/objects/${userId}`)
    ).data as ObjectType[];
});

export async function addObject(object: NewObject) {
    return (
        await dataApi.post(`/objects`, object)
    ).data as ObjectType;
};

export async function updateObject({
    objectId,
    type,
    updates,
}: {
    objectId: string,
    type: ObjectInstanceType,
    updates: LinkUpdates | CodeUpdates | TextUpdates | QuillUpdates | LatexUpdates | ImageUpdates | codeSandboxUpdates,
}) {
    switch (type) {
        case "code":
            return (
                await dataApi.put(`/object/${objectId}`, { codeData: updates as CodeData })
            ).data as ObjectType;
        case "image":
            return (
                await dataApi.put(`/object/${objectId}`, { imageData: updates as ImageData })
            ).data as ObjectType;
        case "latex":
            return (
                await dataApi.put(`/object/${objectId}`, { latexData: updates as LatexData })
            ).data as ObjectType;
        case "link":
            return (
                await dataApi.put(`/object/${objectId}`, { linkData: updates as LinkData })
            ).data as ObjectType;
        case "quill":
            return (
                await dataApi.put(`/object/${objectId}`, { quillData: updates as QuillData })
            ).data as ObjectType;
        case "text":
            return (
                await dataApi.put(`/object/${objectId}`, { textData: updates as TextData })
            ).data as ObjectType;
        case "codesandbox":
            return (
                await dataApi.put(`/object/${objectId}`, { codeSandboxData: updates as CodeSandboxData })
            ).data as ObjectType;
        default:
            throw (new Error("type undefined or not implemented yet."));
    }
};

export async function deleteObject(objectId: string) {
    return (
        await dataApi.delete(`/object/${objectId}`)
    ).data as null;
};

/* Orderings */
export const fetchActivityObjectsOrdering = cache(async (userId: string) => {
    return (
        await dataApi.get(`/orderings/${userId}`)
    ).data as ActivityObjectsOrdering[];
});


export async function addObjectsOrdering({
    activityId,
    objectsOrdering,
    userId,
}: {
    activityId: string;
    objectsOrdering: ObjectsOrdering;
    userId: string,
}) {
    const newObject: ActivityObjectsOrderingData = {
        activityId,
        ordering: objectsOrdering,
        userId
    };

    return (
        await dataApi.post(`/orderings`, newObject)
    ).data as ActivityObjectsOrdering;
};


export const fetchObjectsOrdering = cache(async (activityId: string) => {
    return (
        await dataApi.get(`/ordering/${activityId}`)
    ).data as ObjectsOrdering;
});

export async function updateObjectsOrdering({
    activityId,
    update
}: {
    activityId: string,
    update: ObjectsOrdering
}) {
    return (
        await dataApi.put(`/ordering/${activityId}`, { ordering: update })
    ).data as ActivityObjectsOrdering;
};


export async function deleteObjectsOrdering(activityId: string) {
    return (
        await dataApi.delete(`/ordering/${activityId}`)
    ).data as null;
}