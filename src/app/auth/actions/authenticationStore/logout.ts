"use server";

import { redirect } from "next/navigation";
import { deleteCookie } from "../cookieStore";
import { deleteSession } from "../sessionStore";

export async function logout() {
    await deleteSession();
    await deleteCookie();
    redirect("/");
}