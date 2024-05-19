"use client";

import { LoadingPane, UpdatePassword } from "@/app/auth/components";
import { ResetPassword } from "@/app/auth/context";
import { useEffect, useState } from "react";
import { getConfirmationToken } from "@/app/auth/actions/emailStore";

export default function Reset({ token }: { token: string }) {

    const [email, setEmail] = useState<string | null>(null);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        getConfirmationToken(token)
            .then(r => {
                if (r) {
                    setEmail(r.email);
                }
            })
            .catch(err => setError(true));
    }, [token, setEmail]);

    if (!email) {
        return <LoadingPane loading={true} />
    }

    if (error) {
        return (
            <h2>Could not retrieve token.</h2>
        );
    }

    return (
        <div className="reset">
            Reset password for {email}

            <ResetPassword>
                <UpdatePassword email={email} />
            </ResetPassword>
        </div>
    );
};