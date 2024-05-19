"use server";

import { emailConfirmationApi } from "@/app/axiosInstance";
import { cookies } from "next/headers";

export async function sendConfirmationEmail(email: string) {
    type Response = { success: boolean };
    return (
        await emailConfirmationApi.post("/", { 
            email,
            callback_url: "http://localhost:3000/auth/callback/confirm"
        })
    ).data as Response;
}

export async function sendResetPasswordEmail(email: string) {
    type Response = { success: boolean };
    cookies().set("forgot_email", email);
    return (
        await emailConfirmationApi.post("/", { 
            email,
            callback_url: "http://localhost:3000/auth/callback/password/reset"
        })
    ).data as Response;
}

export async function getConfirmationToken(token: string) {
    type Response = { token: string, email: string } | null;
    return (
        await emailConfirmationApi.get(`/${token}`)
    ).data as Response
}

export async function deleteConfirmationToken(token: string) {
    type Response = { success: boolean };
    return (
        await emailConfirmationApi.delete(`/${token}`)
    ).data as Response;
}
