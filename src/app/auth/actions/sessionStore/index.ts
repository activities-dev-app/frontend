"use server"; /* Without use server we get the error: TypeError: URL constructor: /api/users-api/session is not a valid URL. */

import { usersApi } from "@/app/axiosInstance";
import { LocalSession } from "@/types";
import { getCookie } from "../cookieStore";
import { redirect } from "next/navigation";
import { protectedRoutes } from "@/config";
import { cookies } from "next/headers";

const authorizationToken = process.env.AUTHORIZATION;

export async function getSession() {
    const token = (await getCookie())?.value;
    
    console.log("TOKEN: ", token);

    return (await usersApi.get(`/session`, {
        headers: {
            "Content-Type": "Application/json",
            "authorization": authorizationToken,
            "token": token,
        }
    })).data as LocalSession;
}

export async function checkSession(pathname: string) {
    const session = await getSession();

    if (!session) {
        protectedRoutes.forEach(route => {
            if (pathname.startsWith(route)) {
                redirect("/auth/login");
            }
        });
    }
}

export async function deleteSession() {
    const token = (await getCookie())?.value;
    return (await usersApi.delete(`/session/${token}`)).data;
}
