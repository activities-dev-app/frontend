"use client";

import { useCallback, useState } from "react";
import { Form, FormInput } from "@/components/forms";
import { useResetPassword } from "@/app/auth/context";
import { emailExists } from "@/app/auth/actions/userStore";
import { redirectTo } from "@/app/actions";
import Button from "@/components/Button";
import Image from "next/image";
import image from "./images/undraw_forgot_password_re_hxwm.svg";
import Icon from "@/icons";
import { useTheme } from "@/context";

export default function Page() {

    const mode = "light";

    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const { sendResetPasswordEmail } = useResetPassword();

    const submit = useCallback(async () => {

        /* Validate email before continuing*/

        setLoading(true);
        const emailExistsInBase = await emailExists(email);

        if (emailExistsInBase) {
            sendResetPasswordEmail(email)
                .then(({ success }) => {
                    if (success) {
                        redirectTo(`/auth/password/forgot/success`);
                    } else {
                        console.log("An error ocurred.");
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        } else {
            redirectTo(`/auth/password/forgot/error`);
        }

    }, [email, sendResetPasswordEmail, setLoading]);

    return (
        <div className="forgot">
            <h1 className="title">Forgot your password?</h1>

            <div className="forgot__image">
                <Image
                    src={image}
                    alt="person trying to remember password"
                    width={300}
                />
            </div>


            <h2 className="main-text">Inform below the email associated with your account.</h2>

            <h3 className="secondary-text">We will send you a link to reset your password.</h3>

            <Form>
                <FormInput
                    id="forgot-password"
                    label="email"
                    placeholder="Type your email"
                    value={email}
                    setValue={setEmail}
                    mode={mode}
                />
            </Form>

            <Button
                className="forgot__button"
                label={
                    loading ?
                        <span className="forgot__button--loading-message">
                            Sending email... <Icon icon="loader" className="spinning" />
                        </span> : "Reset password"
                }
                onClick={submit}
                disabled={loading}
            />
        </div>
    );
}