"use server";

import { usersApi } from "@/app/axiosInstance";

export async function resetPassword(data: {
    email: string,
    p1: string,
    p2: string
}) {
    return (
        await usersApi.put("/user/password/reset", data)
    ).data as null;
}