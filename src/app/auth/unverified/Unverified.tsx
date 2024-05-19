"use client"

import { useCallback, useEffect, useState } from "react";
import { useConfirmation } from "@/app/auth/context";
import { redirectTo } from "@/app/actions";
import { LoadingPane } from "../components";
import Button from "@/components/Button";

export default function Unverified({ email }: { email?: string }) {

    const { sendConfirmationEmail } = useConfirmation();
    const [loading, setLoading] = useState<boolean>(false);

    const resendConfirmationEmail = useCallback((email: string) => {
        setLoading(true);
        console.log("Sending confirmation email...");
        sendConfirmationEmail(email)
            .then(({ success }) => {
                if (success) {
                    redirectTo(`/auth/unverified/success`).then(() => setLoading(false));
                } else {
                    console.log("Error while sending email");
                    setLoading(false);
                }
            })
            .catch(err => console.log("EMAIL CONFIRMATION ERROR: ", err));
    }, [sendConfirmationEmail, setLoading]);

    if (!email) {

        setTimeout(() => {
            redirectTo("/auth/login");
        }, 5000);

        return (
            <div>
                <h2>An error ocurred. </h2>

                <h3>Redirecting in 5 seconds.</h3>
            </div>
        );
    }

    return (
        <div className="unverified__verify-message">
            <LoadingPane loading={loading} />
            <h2 className="main-text">{"Your account hasn't been verified yet."}</h2>

            <h3 className="secondary-text">Verify your email to activate your account.</h3>

            <Button
                className="unverified__verify-message__button"
                onClick={() => resendConfirmationEmail(email)}
                label={loading ? "Sending confirmation email..." : "Resend confirmation email"}
            />
        </div>
    );
};