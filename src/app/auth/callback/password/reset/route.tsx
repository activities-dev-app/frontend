"use server";

import { getConfirmationToken } from "@/app/auth/actions/emailStore";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    const token = request.nextUrl.searchParams.get("token");

    if (token && token.length === 60) {

        const response = await getConfirmationToken(token!);

        if (response) {
            const { token, email } = response;
            cookies().set("reset_token", token);

            /* Redirect to password reset page */
            const nextResponse =  NextResponse.redirect(
                new URL(`/auth/password/reset`, request.url)
            );

            return nextResponse;
        } else {
            /* Token expired */
            return NextResponse.redirect(
                new URL("/auth/password/reset/token/expired", request.url)
            );
        }

    } else {
        /* Invalid token */
        return NextResponse.redirect(
            new URL("/auth/password/reset/token/invalid", request.url)
        );
    }
}