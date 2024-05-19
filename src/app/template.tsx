"use client";

import { FormContext, ModalContext, ThemeContext, } from "../context";

import { AuthContext, useSession } from "@/app/auth/context";

export default function Template({ children }: { children: React.ReactNode }) {

    useSession();

    return (
        <AuthContext>
            <ModalContext>
                <FormContext>
                    <ThemeContext>
                        {children}
                    </ThemeContext>
                </FormContext>
            </ModalContext>
        </AuthContext>
    );
}