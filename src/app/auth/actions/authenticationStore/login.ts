"use server";

import { redirect } from "next/navigation";
import { usersApi } from "@/app/axiosInstance";
import { setCookie } from "../cookieStore";
import { getSession } from "../sessionStore";
import { AxiosError } from "axios";
import { cookies } from "next/headers";

type LoginResponseType = { success: boolean, token: string };

export async function login({
    email,
    password,
    rememberMe
}: {
    email: string,
    password: string,
    rememberMe: boolean
}) {

    const data = { email, password, rememberMe };

    let success: boolean = false;
    let token: string | null = null;
    let loginCookie: { 
        name: string, 
        value: string, 
        expires: Date | number | undefined 
    } = { name: "authCookie", value: "", expires: undefined };

    try {
        const response = await usersApi.post("/user/login", data);

        const setCookie = response.headers["set-cookie"];

        if (setCookie) {
            setCookie.forEach(cookie => {
                cookie.split(";").forEach(item => {
                    const entry = item.split("=");
                    const name = entry[0].trim().toLowerCase();
                    const value = entry[1];

                    if (name === "login") {
                        token = value;
                        loginCookie.value = value;
                    }

                    if (name === "expires") {
                        loginCookie.expires = new Date(value);
                    }
                });
            })
        }

        const loginResponse: LoginResponseType = response.data;

        success = loginResponse.success;

    } catch (err) {
        const error = err as AxiosError;
        console.log(err, error.response?.status);
        if (error.code === "ECONNREFUSED") {
            return { success: false, error: error.code };
        }
        return { success: false };
    }

    if (success && token) {
        await setCookie(loginCookie);
        
        const sessionResponse = await getSession();

        if (sessionResponse) {
            const { active, email_verified, email } = sessionResponse;
            
            if (active && email_verified) {
                redirect("/dashboard");
            } else {
                cookies().set("unverified_email", email);
                redirect(`/auth/unverified`);
            }
        } else {
            console.log("Did not receive session response.");
            return { success: false };
        }
    }

    return { success: false };
}
