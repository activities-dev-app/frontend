"use server"

import { NextRequest, NextResponse } from "next/server";
import { deleteConfirmationToken, getConfirmationToken } from "@/app/auth/actions/emailStore";
import { getUserkeyByEmail, setUserAsVerified } from "@/app/auth/actions/userStore";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {

    const token = request.nextUrl.searchParams.get("token");

    if (token && token.length === 60) {

        const response = await getConfirmationToken(token!);

        if (response) {
            const { token, email } = response;

            try {
                const key = await getUserkeyByEmail(email) /* Get user key */
                const response = await setUserAsVerified(key) /* Update - Retruns ** null ** on successful operations */

                if (!response) {
                    console.log("User verified successfully.");
                    await deleteConfirmationToken(token); /* Delete token */

                    cookies().delete("unverified_email");
                    cookies().delete("user_email");

                    const response = NextResponse.redirect(
                        new URL(
                            `/auth/callback/confirm/success`, /* Change this */
                            request.url
                        )
                    );

                    return response;
                }

            } catch (err) {
                console.log("An error occurred while verifying user.\n Error: ", err);

                return NextResponse.redirect(
                    new URL("/auth/callback/confirm/error", request.url)
                );
            }

        } else {
            /* Token expired */
            return NextResponse.redirect(
                new URL("/auth/callback/confirm/token/expired", request.url)
            );
        }
    } else {
        /* Invalid token */
        return NextResponse.redirect(
            new URL("/auth/callback/confirm/token/invalid", request.url)
        );
    }
}