"use server";

import { usersApi } from "@/app/axiosInstance";
import { User } from "@/types";


export async function getUserkeyByEmail(email: string) {

    type Response = { count: number, items: User[] };

    const { count, items } = (
        await usersApi.get(`/users?email=${email}`)
    ).data as Response;

    const { key } = items[0];
    console.log(key);
    console.log(count, items[0]);

    if (count !== 1) {
        if (count === 0) {
            throw Error("Email not found");
        } else {
            throw Error("Duplicated email");
        }
    }
    return key;
}

export async function setUserAsVerified(userId: string) {
    return (
        await usersApi.put(`/user/${userId}`, {
            email_verified: true,
            active: true
        })
    ).data;
}

export async function emailExists(email: string) {
    type Response = { count: number, items: User[] };
    const { count } = (
        await usersApi.get(`/users?email=${email}`)
    ).data as Response;
    return Boolean(count);
}