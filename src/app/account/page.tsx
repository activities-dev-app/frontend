"use client";

import { ResetPassword, useSession } from "../auth/context";
import { Loading } from "@/components";
import { UpdatePassword } from "../auth/components";
import Button from "@/components/Button";
import Link from "next/link";

export default function Page() {

    const { session } = useSession();

    if (!session) {
        return <Loading />;
    }

    return (
        <div className="account-page">
            <h2 className="account-page__title">Account page</h2>

            <section id="email">
                <h3 className="account-page__email">{session.email}</h3>
            </section>

            <section id="password">
                <ResetPassword>
                    <UpdatePassword email={session.email} />
                </ResetPassword>
            </section>
        </div>
    );
}