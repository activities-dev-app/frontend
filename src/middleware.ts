"use server";

/* 
    Can not use axios here, because here next is using the Edge runtime, 
    and Axios is trying to use Node.js apis:
    <<There is no suitable adapter to dispatch the request since :
    - adapter xhr is not supported by the environment
    - adapter http is not available in the build>>
*/

import { NextRequest, NextResponse } from "next/server";
import { LocalSession } from "./types";

export async function middleware(request: NextRequest) {

    const { pathname } = request.nextUrl;

    const token = (request: NextRequest) => {
        let authCookie = request.cookies.get("authCookie");
        return authCookie ? authCookie.value : "";
    };

    const session = async (request: NextRequest) => {
        try {
            const url = process.env.SERVER_API_URL + "/users-api/session";

            const headers = {
                "Content-Type": "Application/json",
                "authorization": process.env.AUTHORIZATION,
                "token": token(request),
            }

            /* @ts-ignore */
            return await (await fetch(url, { headers })).json() as unknown as LocalSession;
        } catch (err) {
            console.log("ERROR: ", err);
            return null;
        }
    };

    const userSession = await session(request);

    if (!userSession) {

        const condition =
            pathname.startsWith("/dashboard") ||
            pathname.startsWith("/account");

        if (condition) {
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }

    } else {

        if (pathname === "/auth/login") {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }

        if (pathname === "/auth/unverified") {
            if (userSession.active && userSession.email_verified) {
                return NextResponse.redirect(new URL("/dashboard", request.url));
            }
        }
    }

    if ([
        "/auth",
        "/auth/password",
        "/auth/callback"
    ].includes(pathname)) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    if (pathname === "/auth/register/success") {
        const email = request.nextUrl.searchParams.get("email");
        const response = NextResponse.next();

        if (email) {
            response.headers.set("email", email);
        }

        return response;
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/account",
        "/auth",
        "/auth/password",
        "/auth/password/reset",
        "/auth/login",
        "/auth/register/success",
        "/auth/unverified",
        "/auth/confirm",
        "/auth/callback",
        "/auth/callback/confirm/success"
    ]
};