"use server";

import { redirect } from "next/navigation";
import { usersApi } from "@/app/axiosInstance";
import { UserModel } from "@/models";
import { sendConfirmationEmail } from "../emailStore";
import { AxiosError } from "axios";
import { cookies } from "next/headers";

type RegisterResponseType = { success: boolean };

export async function register({
    user,
    password
}: {
    user: UserModel,
    password: string
}) {

    const data = { user, password };

    let success: boolean = false;

    try {
        const registerResponse = (
            await usersApi.post(`/user/register`, data)
        ).data as RegisterResponseType;

        success = registerResponse.success;
    } catch (err) {
        const error = err as AxiosError;
        console.log(error.response?.status);
        if (error.code === "ECONNREFUSED") {
            return { success: false, error: error.code };
        }
        return { success: false };
    }

    if (success) {

        const confirmationResponse = await sendConfirmationEmail(user.email);

        if (confirmationResponse.success) {
            cookies().set("user_email", user.email);
            redirect(`/auth/register/success`);
        } else {
            console.log("Could not redirect to success page.");
            redirect(`/auth/register/error`);
        }
    }

    return { success: false };
}
