"use server";

import { cookies } from "next/headers";

export async function setCookie({
    name = "authCookie",
    value,
    expires
}: {
    name: string,
    value: string,
    expires: number | Date | undefined
}) {
    return cookies().set({
        name,
        value,
        secure: true,
        sameSite: "strict",
        httpOnly: true,
        expires,
    });
}

export async function getCookie(name: string = "authCookie") {
    return cookies().get(name);
}

export async function deleteCookie(name: string = "authCookie") {
    return cookies().delete(name);
}
