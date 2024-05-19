"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState
} from "react";

import type {
    Activity,
    ActivityObjectsOrdering,
    ActivityObjectsOrderingData,
    ActivityUpdates,
    Category,
    CategoryUpdates,
    CodeData,
    CodeSandboxData,
    CodeUpdates,
    ImageData,
    ImageUpdates,
    LatexData,
    LatexUpdates,
    LinkData,
    LinkUpdates,
    NewActivity,
    NewObject,
    ObjectInstanceType,
    ObjectOrdering,
    ObjectType,
    ObjectsOrdering,
    QuillData,
    QuillUpdates,
    TextData,
    TextUpdates,
    codeSandboxUpdates,
} from "@/types";

import { dataStore } from "../actions";

import { AppData } from "./appData";
import { useParams } from "next/navigation";

export const appData = new AppData();

type ContextType = {
    categories: Category[] | [];

    fetchCategories: ({ revalidate }: { revalidate: boolean }) => Promise<void>;

    getCategories: () => Promise<Category[]>;

    addCategory: ({ categoryName, categoryDescription, userId }: {
        categoryName: string,
        categoryDescription: string,
        userId: string,
    }) => Promise<Category>;

    updateCategory: ({ categoryId, updates }: {
        categoryId: string;
        updates: CategoryUpdates;
    }) => Promise<Category>;

    deleteCategory: ({ categoryId }: { categoryId: string }) => Promise<void>;

    loadingCategories: boolean;

    fetchCategoryError: boolean;

    activities: Activity[] | [];

    fetchActivities: ({ revalidate }: { revalidate: boolean }) => Promise<void>;

    getActivities: () => Promise<Activity[]>;

    addActivity: ({
        categoryId,
        activityName,
        activityDescription,
        userId,
    }: {
        categoryId: string;
        activityName: string;
        activityDescription: string;
        userId: string;
    }) => Promise<Activity>;

    updateActivity: ({ activityId, updates }: {
        activityId: string;
        updates: {
            name?: string;
            description?: string;
        };
    }) => Promise<Activity>;

    deleteActivity: ({ activityId }: { activityId: string }) => Promise<null>;

    loadingActivities: boolean;

    fetchActivityError: boolean;


    activityObjectsList: ObjectType[];

    setActivityObjectsList: React.Dispatch<React.SetStateAction<ObjectType[]>>

    fetchActivityObjects: ({ revalidate }: { revalidate: boolean }) => void;

    addObject: ({ userId, activityId, type, linkData, textData, quillData, codeData, latexData, imageData, codeSandboxData }: {
        userId: string;
        activityId: string;
        type: ObjectInstanceType;
        position: number;
        linkData?: LinkData;
        textData?: TextData;
        quillData?: QuillData;
        codeData?: CodeData;
        latexData?: LatexData;
        imageData?: ImageData;
        codeSandboxData?: CodeSandboxData;
    }) => Promise<ObjectType | undefined>;

    updateObject: ({ objKey, linkUpdates, codeUpdates, imageUpdates, latexUpdates, quillUpdates, textUpdates, codeSandboxUpdates, type, }: {
        objKey: string;
        linkUpdates?: LinkUpdates;
        textUpdates?: TextUpdates;
        quillUpdates?: QuillUpdates;
        codeUpdates?: CodeUpdates;
        latexUpdates?: LatexUpdates;
        imageUpdates?: ImageUpdates;
        codeSandboxUpdates?: codeSandboxUpdates;
        type: ObjectInstanceType;
    }) => void

    removeObject: (objKey: string) => void;

    activityObjectsOrderings: ActivityObjectsOrdering[];

    setActivityObjectsOrderings: React.Dispatch<React.SetStateAction<ActivityObjectsOrdering[]>>;

    //fetchActivityObjectsOrdering: () => void
    fetchActivityObjectsOrdering: ({ revalidate }: { revalidate: boolean }) => void;

    addObjectsOrdering: ({ activityId, objectsOrdering }: {
        activityId: string;
        objectsOrdering: ObjectsOrdering;
    }) => void;

    updateObjectsOrdering: ({ activityId, update }: {
        activityId: string;
        update: ObjectsOrdering;
    }) => void;

    deleteObjectsOrdering: ({ activityId }: {
        activityId: string;
    }) => void;

    saveAllOrderings: () => void;

    updateOrdering: () => void;

    buildObjectsOrderings: () => void;
}

const defaultCategory: Category = {
    created_at: 0,
    description: "",
    key: "",
    name: "",
    updated_at: 0,
    userId: ""
};

const defaultActivity: Activity = {
    categoryId: "",
    created_at: 0,
    description: "",
    key: "",
    name: "",
    updated_at: 0,
    userId: "",
};

const defaultValue: ContextType = {
    categories: [],
    fetchCategories: async () => { },
    getCategories: async () => [],
    addCategory: async () => defaultCategory,
    updateCategory: async () => defaultCategory,
    deleteCategory: async () => { },
    fetchCategoryError: false,
    loadingCategories: false,

    activities: [],
    fetchActivities: async () => { },
    getActivities: async () => [],
    addActivity: async () => defaultActivity,
    updateActivity: async () => defaultActivity,
    deleteActivity: async () => null,
    fetchActivityError: false,
    loadingActivities: false,

    activityObjectsList: [],
    setActivityObjectsList: () => { },
    fetchActivityObjects: () => { },
    addObject: async () => undefined,
    updateObject: () => { },
    removeObject: () => { },

    activityObjectsOrderings: [],
    setActivityObjectsOrderings: () => { },

    addObjectsOrdering: () => { },
    deleteObjectsOrdering: () => { },
    fetchActivityObjectsOrdering: () => { },
    updateObjectsOrdering: () => { },

    saveAllOrderings: () => { },
    updateOrdering: () => { },
    buildObjectsOrderings: () => { },
};

const Context = createContext(defaultValue);

export default function DataContext({
    children,
    userId
}: {
    children: React.ReactNode,
    userId: string
}) {
    return (
        <Context.Provider value={{
            ...useCategories(userId),
            ...useActivities(userId),
            ...useActivityObjects(userId),
        }}>
            {children}
        </Context.Provider>
    );
}


const useCategories = (userId: string) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const fetchCategories = useCallback(async ({ revalidate }: { revalidate: boolean }) => {

        const fetchDataFromRemoteServer = () => {
            console.log("Fetching categories");

            setLoading(true);
            dataStore.fetchCategories(userId)
                .then(data => {
                    if (data) {
                        setCategories(data);
                        appData.setCategories(data);
                        setError(false);
                    } else {
                        setError(true);
                    }
                })
                .catch(err => {
                    console.error(err);
                    setError(true);
                })
                .finally(() => setLoading(false));
        }

        if (revalidate) {
            fetchDataFromRemoteServer();
            return;
        }

        const cachedCategories = appData.getCategories();

        if (cachedCategories) {
            setCategories(cachedCategories);
        } else {
            fetchDataFromRemoteServer();
        }

    }, [setError, setLoading, setCategories, userId]);

    const getCategories = useCallback(async () => {
        const data = await dataStore.fetchCategories(userId);

        if (!data) {
            return [];
        }

        return data;
    }, [userId]);

    useEffect(() => {
        fetchCategories({ revalidate: false });
    }, [fetchCategories]);

    const addCategory = async ({
        categoryName,
        categoryDescription,
        userId,
    }: {
        categoryName: string;
        categoryDescription: string;
        userId: string;
    }) => {
        return await dataStore.addCategory({
            categoryName,
            categoryDescription,
            userId,
        });
    };

    const updateCategory = async ({
        categoryId,
        updates
    }: {
        categoryId: string;
        updates: CategoryUpdates;
    }) => {
        Object.entries(updates).map(entry => {
            entry[0] === "name" && (updates.name = entry[1].toLowerCase());
            entry[0] === "description" && (updates.description = entry[1].toLowerCase());
        });

        return await dataStore.updateCategory({ categoryId, updates });
    };

    const deleteCategory = async ({ categoryId }: { categoryId: string }) => {

        const removeAllRelatedActivities = async () => {
            const collectedIds = (
                await dataStore.getActivitiesByCategoryId(categoryId)
            ).map((activity) => activity.key);

            await dataStore.deleteManyActivities(collectedIds);
        };


        await dataStore.deleteCategory(categoryId);
        await removeAllRelatedActivities();

        setCategories(categories.filter(category => category.key !== categoryId));
    };

    return {
        categories,
        fetchCategories,
        getCategories,
        addCategory,
        updateCategory,
        deleteCategory,
        loadingCategories: loading,
        fetchCategoryError: error,
    };
};


const useActivities = (userId: string) => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const fetchActivities = useCallback(async ({ revalidate }: { revalidate: boolean }) => {

        const fetchDataFromRemoteServer = () => {
            console.log("Fetching activities");

            setLoading(true);
            dataStore.fetchActivities(userId)
                .then(data => {
                    if (data) {
                        setActivities(data);
                        appData.setActivities(data);
                        setError(false);
                    } else {
                        setError(true);
                    }
                })
                .catch(err => {
                    console.error(err)
                    setError(true)
                })
                .finally(() => setLoading(false));
        };

        if (revalidate) {
            fetchDataFromRemoteServer();
            return;
        }

        const cachedActivities = appData.getActivities();

        if (cachedActivities) {
            setActivities(cachedActivities);
        } else {
            fetchDataFromRemoteServer();
        }

    }, [setError, setLoading, setActivities, userId]);

    const getActivities = useCallback(async () => {
        const data = await dataStore.fetchActivities(userId);

        if (!data) {
            return [];
        }

        return data;
    }, [userId]);

    useEffect(() => {
        fetchActivities({ revalidate: false });
    }, [fetchActivities]);

    const addActivity = async ({
        categoryId,
        activityName,
        activityDescription,
        userId,
    }: {
        categoryId: string;
        activityName: string;
        activityDescription: string;
        userId: string;
    }) => {
        const newActivity: NewActivity = {
            categoryId: categoryId,
            name: activityName.toLowerCase(),
            description: activityDescription.toLowerCase(),
            userId: userId,
        };

        return await dataStore.addActivity(newActivity);
    };

    const updateActivity = async ({
        activityId,
        updates
    }: {
        activityId: string,
        updates: ActivityUpdates
    }) => {
        return await dataStore.updateActivity({ activityId, updates });
    };

    const deleteActivity = async ({ activityId }: { activityId: string }) => {
        return await dataStore.deleteActivity(activityId);
    };

    return {
        activities,
        fetchActivities,
        getActivities,
        addActivity,
        updateActivity,
        deleteActivity,
        loadingActivities: loading,
        fetchActivityError: error,
    };
};


const useActivityObjects = (userId: string) => {
    const [activityObjectsList, setActivityObjectsList] = useState<ObjectType[]>([]);
    const [unorderedActivityObjectsList, setUnorderedActivityObjectsList] = useState<ObjectType[]>([]);
    const [activityObjectsOrderings, setActivityObjectsOrderings] = useState<ActivityObjectsOrdering[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const { activities } = useActivities(userId);


    /* 
    
        Fetch All Objects
    
        */
    const fetchActivityObjects = useCallback(({ revalidate }: { revalidate: boolean }) => {
        const fetchDataFromRemoteServer = () => {
            console.log("Fetching Objects...");

            setLoading(true);

            dataStore.fetchObjects(userId)
                .then(data => {
                    if (data) {
                        setUnorderedActivityObjectsList(data);
                        appData.setObjects(data);
                        setError(false);
                        console.log("SERVER OBJECTS: ", data);
                    } else {
                        setError(true);
                    }
                })
                .catch(err => {
                    console.error(err);
                    setError(true);
                })
                .finally(() => setLoading(false));
        };

        if (revalidate) {
            fetchDataFromRemoteServer();
            return;
        }

        const cachedData = appData.getObjects();

        console.log("CACHED OBJECTS: ", cachedData);

        if (cachedData) {
            setUnorderedActivityObjectsList(cachedData);
        } else {
            fetchDataFromRemoteServer();
        }
    }, [userId]);


    useEffect(() => {
        fetchActivityObjects({ revalidate: false });
    }, [fetchActivityObjects]);


    /* 
    
        Add Object
    
        */
    const addObject = useCallback(
        async ({
            userId,
            activityId,
            type,
            position,
            linkData,
            textData,
            quillData,
            codeData,
            latexData,
            imageData,
            codeSandboxData,
        }: {
            userId: string;
            activityId: string;
            type: ObjectInstanceType;
            position: number;
            linkData?: LinkData;
            textData?: TextData;
            quillData?: QuillData;
            codeData?: CodeData;
            latexData?: LatexData;
            imageData?: ImageData;
            codeSandboxData?: CodeSandboxData;
        }) => {

            let newObject: NewObject = {
                userId,
                activityId,
                type,
                position,
            };

            if (type === "code") {
                newObject = { ...newObject, codeData };
            }
            if (type === "image") {
                newObject = { ...newObject, imageData };
            }
            if (type === "link") {
                newObject = { ...newObject, linkData };
            }
            if (type === "latex") {
                newObject = { ...newObject, latexData };
            }
            if (type === "quill") {
                newObject = { ...newObject, quillData };
            }
            if (type === "text") {
                newObject = { ...newObject, textData };
            }
            if (type === "codesandbox") {
                newObject = { ...newObject, codeSandboxData };
            }

            console.log(newObject);

            setActivityObjectsList([
                ...activityObjectsList,
                {
                    ...newObject,
                    /**
                     *  Dummy item with temporary values, necessary to 
                     *  update imediatelly the list with the new item;
                     *  will be updated in the next step...
                     * */
                    created_at: Date.now(),
                    key: "",
                    updated_at: null,
                    position: position + 1
                }
            ]);

            try {
                const response = await dataStore.addObject(newObject);

                const newKey = response.key;

                const newObjectOrdering: ObjectOrdering = {
                    objectId: newKey,
                    position: position + 1 /* Add object below */
                };

                /**
                 * Does a objects ordering exist for this activity yet?
                 */
                const objectsOrdering = activityObjectsOrderings.filter(obj => {
                    return obj.activityId === activityId;
                });

                const objectsOrderingExists = objectsOrdering.length === 1;

                if (objectsOrderingExists) {
                    const ordering = activityObjectsOrderings
                        .filter(obj => {
                            return obj.activityId === activityId;
                        })[0].ordering;

                    if (ordering.length > 0) {
                        const updatedOrdering: ObjectsOrdering = [
                            ...ordering
                                .map(entry => {
                                    if (entry.position > position) {
                                        return { ...entry, position: entry.position + 1 };
                                    }
                                    return entry;
                                }),
                            newObjectOrdering,
                        ];

                        const newActivityObjectsOrdering = activityObjectsOrderings.map(obj => {
                            if (obj.activityId === activityId) {
                                return {
                                    ...obj,
                                    ordering: updatedOrdering,
                                };
                            }
                            return obj;
                        });

                        setActivityObjectsOrderings(newActivityObjectsOrdering);

                        updateObjectsOrdering({
                            activityId,
                            update: updatedOrdering,
                        });
                    } else {
                        const updatedOrdering: ObjectsOrdering = [ newObjectOrdering ];

                        const newActivityObjectsOrdering = activityObjectsOrderings.map(obj => {
                            if (obj.activityId === activityId) {
                                return {
                                    ...obj,
                                    ordering: updatedOrdering,
                                };
                            }
                            return obj;
                        });

                        setActivityObjectsOrderings(newActivityObjectsOrdering);

                        updateObjectsOrdering({
                            activityId,
                            update: updatedOrdering,
                        });
                    }
                }

                setUnorderedActivityObjectsList([...activityObjectsList, response]);
                appData.setObjects([...activityObjectsList, response]);

                return response;
            } catch (err) {
                console.log("An error occurred while trying to add an object: ", err);
            }

        }, [activityObjectsList, setActivityObjectsList, activityObjectsOrderings, setActivityObjectsOrderings]);


    /* 
        Update Objects 
        
        */
    const updateObject = useCallback(({
        objKey,
        linkUpdates,
        codeUpdates,
        imageUpdates,
        latexUpdates,
        quillUpdates,
        textUpdates,
        codeSandboxUpdates,
        type,
    }: {
        objKey: string,
        linkUpdates?: LinkUpdates;
        textUpdates?: TextUpdates;
        quillUpdates?: QuillUpdates;
        codeUpdates?: CodeUpdates;
        latexUpdates?: LatexUpdates;
        imageUpdates?: ImageUpdates;
        codeSandboxUpdates?: codeSandboxUpdates;
        type: ObjectInstanceType;
    }) => {

        let updates: LinkUpdates |
            TextUpdates |
            QuillUpdates |
            CodeUpdates |
            LatexUpdates |
            ImageUpdates |
            codeSandboxUpdates = {};

        if (type === "link") {
            const currentData = activityObjectsList.filter(obj => obj.key === objKey)[0].linkData;
            updates = { ...currentData, ...linkUpdates };
        }
        if (type === "text") {
            const currentData = activityObjectsList.filter(obj => obj.key === objKey)[0].textData;
            updates = { ...currentData, ...textUpdates };
        }
        if (type === "quill") {
            const currentData = activityObjectsList.filter(obj => obj.key === objKey)[0].quillData;
            updates = { ...currentData, ...quillUpdates };
        }
        if (type === "code") {
            const currentData = activityObjectsList.filter(obj => obj.key === objKey)[0].codeData;
            updates = { ...currentData, ...codeUpdates };
        }
        if (type === "latex") {
            const currentData = activityObjectsList.filter(obj => obj.key === objKey)[0].latexData;
            updates = { ...currentData, ...latexUpdates };
        }
        if (type === "image") {
            const currentData = activityObjectsList.filter(obj => obj.key === objKey)[0].imageData;
            updates = { ...currentData, ...imageUpdates };
        }
        if (type === "codesandbox") {
            const currentData = activityObjectsList.filter(obj => obj.key === objKey)[0].codeSandboxData;
            updates = { ...currentData, ...codeSandboxUpdates };
        }

        console.log("UPDATES: ", updates);

        setActivityObjectsList(activityObjectsList.map(obj => {
            if (obj.key === objKey) {
                switch (type) {
                    case "code":
                        return { ...{ ...obj, updated_at_at: Date.now() }, codeData: { ...updates as CodeData } };
                    case "image":
                        return { ...{ ...obj, updated_at_at: Date.now() }, imageData: { ...updates as ImageData } };
                    case "latex":
                        return { ...{ ...obj, updated_at_at: Date.now() }, latexData: { ...updates as LatexData } };
                    case "link":
                        return { ...{ ...obj, updated_at_at: Date.now() }, linkData: { ...updates as LinkData } };
                    case "quill":
                        return { ...{ ...obj, updated_at_at: Date.now() }, quillData: { ...updates as QuillData } };
                    case "text":
                        return { ...{ ...obj, updated_at_at: Date.now() }, textData: { ...updates as TextData } };
                    case "codesandbox":
                        return { ...{ ...obj, updated_at_at: Date.now() }, codeSandboxData: { ...updates as CodeSandboxData } };
                }
            }
            return obj;
        }).sort((a, b) => { return a.created_at - b.created_at }));

        console.log(updates);

        dataStore.updateObject({ objectId: objKey, type, updates })
            .catch(err => console.log("An error occurred while trying to update the object. ", err));

    }, [activityObjectsList, setActivityObjectsList]);


    /* 
     
        Delete Object
     
        */
    const removeObject = useCallback((objKey: string) => {

        const removedObject = activityObjectsList.filter(obj => {
            return obj.key === objKey;
        })[0];

        const { activityId, key, position } = removedObject;

        const newList = activityObjectsList.filter(obj => obj.key !== objKey);

        const updatedOrdering: ObjectsOrdering = activityObjectsOrderings
            .filter(obj => {
                return obj.activityId === activityId;
            })[0].ordering
            .filter(item => {
                return item.objectId !== key;
            })
            .map(entry => {
                if (entry.position > position) {
                    return { ...entry, position: entry.position - 1 };
                }
                return entry;
            });

        const newActivityObjectsOrdering = activityObjectsOrderings.map(obj => {
            if (obj.activityId === activityId) {
                return {
                    ...obj,
                    ordering: updatedOrdering,
                };
            }
            return obj;
        });

        setActivityObjectsOrderings(newActivityObjectsOrdering);

        updateObjectsOrdering({
            activityId,
            update: updatedOrdering,
        });

        setUnorderedActivityObjectsList(newList);
        appData.setObjects(newList);
        dataStore.deleteObject(objKey);
    }, [activityObjectsList, activityObjectsOrderings, setActivityObjectsList]);


    /**
     * Ordering objects
     * 
     */

    /**
     *  Fetch activity orderings
     */
    const fetchActivityObjectsOrdering = useCallback(({ revalidate }: { revalidate: boolean }) => {
        const fetchDataFromRemoteServer = () => {
            console.log("Fetching Objects ordering...");

            setLoading(true);

            dataStore.fetchActivityObjectsOrdering(userId)
                .then(data => {
                    if (data) {
                        if (data.length > 0) {
                            setActivityObjectsOrderings(data);
                            appData.setActivityObjectsOrdering(data);
                            setError(false);
                            console.log("SERVER ORDERINGS: ", data);
                        } else {
                            console.log("No orderings on server.");
                        }
                    } else {
                        setError(true);
                    }
                })
                .catch(err => {
                    console.error(err);
                    setError(true);
                })
                .finally(() => setLoading(false));
        };

        if (revalidate) {
            fetchDataFromRemoteServer();
            return;
        }

        const cachedOrderings = appData.getActivityObjectsOrdering();

        console.log("CACHED Orderings: ", cachedOrderings);

        if (cachedOrderings) {
            console.log("Getting orderings from appData...");
            setActivityObjectsOrderings(cachedOrderings);

        } else {
            fetchDataFromRemoteServer();
        }
    }, [setActivityObjectsOrderings, userId]);

    useEffect(() => {
        fetchActivityObjectsOrdering({ revalidate: false });
    }, [fetchActivityObjectsOrdering]);


    /**
     *  Set up the ordering of the objects...
     */
    const updateOrdering = useCallback(() => {
        setActivityObjectsList(unorderedActivityObjectsList.map(obj => {
            const activityId = obj.activityId;
            const key = obj.key;

            let position = 0;

            activityObjectsOrderings.forEach(entry => {
                if (entry.ordering.length > 0) {
                    entry.ordering.forEach(item => {
                        if (item.objectId === key) {
                            //console.log("Position: ", item.position);
                            position = item.position;
                        }
                    })
                }
            });

            return { ...obj, position };
        }))
    }, [activityObjectsOrderings, unorderedActivityObjectsList]);

    useEffect(() => {
        updateOrdering();
    }, [updateOrdering]);


    /**
     * Add activity ordering
     */
    const addObjectsOrdering = useCallback(({
        activityId,
        objectsOrdering
    }: {
        activityId: string,
        objectsOrdering: ObjectsOrdering
    }) => {
        dataStore.addObjectsOrdering({ activityId, objectsOrdering, userId })
            .then(r => {
                if (r) {
                    console.log("New objects ordering: ", r)
                    appData.setObjectsOrdering({ activityId, ordering: objectsOrdering });
                    setActivityObjectsOrderings([...activityObjectsOrderings, r ]);
                }
            })
    }, [userId]);

    /**
     * Update activity ordering
     */
    const updateObjectsOrdering = useCallback(({
        activityId,
        update
    }: {
        activityId: string,
        update: ObjectsOrdering
    }) => {
        dataStore.updateObjectsOrdering({ activityId, update })
            .then(r => {
                appData.setObjectsOrdering({ activityId, ordering: update });
            })
    }, []);

    /**
     * Delete activity ordering
     */
    const deleteObjectsOrdering = useCallback(({ activityId }: { activityId: string }) => {
        dataStore.deleteObjectsOrdering(activityId);
    }, []);


    /* Utility function to build up the orderings for an existing list of objects. */
    const buildObjectsOrderings = useCallback(() => {
        //const cachedData = appData.getActivityObjectsOrdering();
        //console.log("CACHED ORDERINGS DATA: ", cachedData);

        let buildActivityObjectsOrdering: ActivityObjectsOrderingData[] = [];

        new Set(activities.map(activity => activity.key)) /* A list of activity ids... */
            .forEach(activityId => {
                const activityObjects = activityObjectsList
                    .filter(entry => entry.activityId === activityId)
                    .sort((a, b) => a.created_at - b.created_at);

                buildActivityObjectsOrdering.push({
                    activityId,
                    ordering: activityObjects.map((obj, index) => {
                        return { objectId: obj.key, position: index + 1 }
                    }),
                    userId,
                });
            });

        console.log("buildActivityObjectsOrdering: ", buildActivityObjectsOrdering);

        const promises = buildActivityObjectsOrdering.map(entry => {
            return dataStore.addObjectsOrdering({
                activityId: entry.activityId,
                objectsOrdering: entry.ordering,
                userId: entry.userId,
            });
        });

        Promise.all([...promises]).then(r => {
            console.log(r);
        });

    }, [activityObjectsList, activities, userId]);

    /* Sends all built orderings to the server. */
    const saveAllOrderings = useCallback(() => {
        console.log("SERVER, activityObjectsOrderings: ", activityObjectsOrderings);
        const orderings = appData.getActivityObjectsOrdering();
        if (orderings) {
            const promises = orderings.map(entry => {
                return dataStore.addObjectsOrdering({
                    activityId: entry.activityId,
                    objectsOrdering: entry.ordering,
                    userId,
                });
            });

            Promise.all([...promises]).then(r => {
                console.log(r);
            });
        }
    }, [activityObjectsOrderings, userId]);


    return {
        activityObjectsList,
        setActivityObjectsList,
        fetchActivityObjects,
        addObject,
        updateObject,
        removeObject,
        activityObjectsOrderings,
        setActivityObjectsOrderings,
        fetchActivityObjectsOrdering,
        addObjectsOrdering,
        updateObjectsOrdering,
        deleteObjectsOrdering,
        saveAllOrderings,
        updateOrdering,
        buildObjectsOrderings,
    };
};

export const useDataContext = () => useContext<ContextType>(Context);
