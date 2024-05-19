"use client";

import { useCallback, useEffect, useState } from "react";
import { useResetPassword } from "../context";
import { Form, FormInput } from "@/components/forms";
import { useValidation } from "../hooks";
import Button from "@/components/Button";
import FormButtonsGroup from "@/components/forms/FormButtonsGroup";
import Icon from "@/icons";
import { useTheme } from "@/context";

export default function UpdatePassword({ email }: { email: string }) {

    const mode = "light";

    const [password, setPassword] = useState<string>("");
    const [retypedPassword, setRetypedPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const { updatePassword } = useResetPassword();

    const {
        passwordError,
        setPasswordError,
        retypedPasswordError,
        setRetypedPasswordError,
        resetErrors,
        validatePassword
    } = useValidation();

    const submit = useCallback(async () => {
        updatePassword(email, password, retypedPassword);
    }, [updatePassword, email, password, retypedPassword]);

    useEffect(() => {
        resetErrors();
    }, [resetErrors]);


    return (
        <Form title="Reset password">
            <FormInput
                id="new-password"
                label="New password"
                placeholder="New password"
                autoFocus={false}
                type={showPassword ? "text" : "password"}
                value={password}
                setValue={setPassword}
                error={passwordError}
                setError={setPasswordError}
                errorMessage={
                    passwordError === "emptyPassword" && "Password cannot be empty" ||
                    passwordError === "tooShortPassword" && "Password must hava at least 8 characters" ||
                    passwordError === "tooLongPassword" && "Password must have less than 72 characters"
                }
                validateInput={validatePassword}
                mode={mode}
            >
                <Button
                    className="icon-align-right"
                    onClick={() => setShowPassword(!showPassword)}>
                    {
                        showPassword ?
                            <Icon icon="eye-off" /> :
                            <Icon icon="eye" />
                    }
                </Button>
            </FormInput>

            <FormInput
                id="confirm-new-password"
                label="Confirm new password"
                placeholder="confirm new password"
                autoFocus={false}
                type={showPassword ? "text" : "password"}
                value={retypedPassword}
                setValue={setRetypedPassword}
                error={retypedPasswordError}
                setError={setRetypedPasswordError}
                errorMessage={
                    retypedPasswordError && "Passwords don't match. Please double check values"
                }
                mode={mode}
            />

            <FormButtonsGroup>
                <Button
                    label="Reset password"
                    onClick={submit}
                />
            </FormButtonsGroup>
        </Form>

    );
}