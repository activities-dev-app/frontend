"use server";

/* https://gist.github.com/greggyNapalm/2413028 */

import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";

const authorizationToken = process.env.AUTHORIZATION;

if (!authorizationToken) {
    throw Error("Authorization token undefined");
}

const headers = {
    "Content-Type": "Application/json",
    "authorization": authorizationToken,
};

export const api = axios.create({ 
    baseURL: process.env.SERVER_API_URL,
    headers 
});

export const dataApi = axios.create({ 
    baseURL: process.env.SERVER_API_URL + "/data-api",
    headers 
});

export const usersApi = axios.create({
    baseURL: process.env.SERVER_API_URL + "/users-api",
    headers,
});

export const sendEmailAPI= axios.create({ 
    baseURL: process.env.SEND_EMAIL_API_URL,
    headers 
});

export const emailConfirmationApi = axios.create({
    baseURL: process.env.SEND_EMAIL_API_URL + "/email-confirmation",
    headers
});

export const errorHandler = (err: any) => {
    const error = err as AxiosError;
    console.log("IS AXIOS ERROR? ", error.isAxiosError);
    console.log("CAUSE: ", error.cause);
    console.log("CODE: ", error.code);
    console.log("MESSAGE: ", error.message);
    console.log("NAME: ", error.name);
    console.log("STATUS: ", error.status);
    //console.log(error.toJSON());
    
    if (error.code === "ECONNREFUSED") {
        return NextResponse.json({ error: error.cause }, { status: 500 });
    } else {
        return NextResponse.json({ error: error.cause }, { status: error.status });
    }
};
