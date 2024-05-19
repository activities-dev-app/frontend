import {
    Activity,
    Category,
    ObjectType,
    ActivityObjectsOrdering,
    ObjectsOrdering
} from "@/types";

type Data = {
    categories: Category[];
    activities: Activity[];
    objects: ObjectType[];
    activityObjectsOrdering: ActivityObjectsOrdering[];
}

export class AppData {

    categories: Category[] | null;
    activities: Activity[] | null;
    objects: ObjectType[] | null;
    activityObjectsOrdering: ActivityObjectsOrdering[] | null;

    constructor() {
        this.activities = null;
        this.categories = null;
        this.objects = null;
        this.activityObjectsOrdering = null;
    }

    setActivities(activities: Activity[]) {
        this.activities = activities;
    }

    getActivities() {
        return this.activities;
    }

    setCategories(categories: Category[]) {
        this.categories = categories;
    }

    getCategories() {
        return this.categories;
    }

    setObjects(objects: ObjectType[]) {
        this.objects = objects;
    }

    getObjects() {
        return this.objects;
    }

    setActivityObjectsOrdering(obj: ActivityObjectsOrdering[]) {
        this.activityObjectsOrdering = obj;
    }

    getActivityObjectsOrdering() {
        return this.activityObjectsOrdering;
    }

    setObjectsOrdering({ activityId, ordering }: { activityId: string, ordering: ObjectsOrdering }) {
        if (this.activityObjectsOrdering) {
            this.activityObjectsOrdering = this.activityObjectsOrdering.map(entry => {
                if (entry.activityId === activityId) {
                    return { ...entry, ordering };
                }
                return entry;
            })
        }
    }

    getObjectsOrdering(activityId: string) {
        if (this.activityObjectsOrdering) {
            const foundObject = this.activityObjectsOrdering.filter(entry => {
                return entry.activityId === activityId;
            });

            if (foundObject.length > 0) {
                return foundObject[0].ordering;
            } else {
                return [];
            }
        }
    }

    getData() {
        return {
            activities: this.activities,
            categories: this.categories,
            objects: this.objects,
            activityObjectsOrdering: this.activityObjectsOrdering,
        } as Data;
    }

    clear() {
        this.activities = null;
        this.categories = null;
        this.objects = null;
        this.activityObjectsOrdering = null;
    }
}
