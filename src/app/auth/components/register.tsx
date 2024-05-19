"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/app/auth/context";
import { LoadingPane } from "./loadingPane";
import { Button } from "@/components";
import { FormButtonsGroup, Form, FormInput } from "@/components/forms";
import { useValidation } from "../hooks";
import Link from "next/link";
import Icon from "@/icons";
import { useTheme } from "@/context";

export default function Register() {

    const mode = "light";
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [retypedPassword, setRetypedPassword] = useState("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [passwordStrength, setPasswordStrength] = useState<{ score: number, status: string, percent: number }>();

    const { register, working } = useAuth();

    const {
        emailError,
        setEmailError,
        passwordError,
        setPasswordError,
        retypedPasswordError,
        setRetypedPasswordError,
        resetErrors,
        validatePassword,
        validateStrongPassword,
        checkEmailExists,
        registerError,
        setRegisterError,
    } = useValidation();

    useEffect(() => {
        resetErrors();
    }, [resetErrors]);

    const submit = useCallback(async () => {
        const response = await register({ email, password, retypedPassword });
        console.log(response);
        setEmailError(response.emailError);
        setPasswordError(response.passwordError);
        setRetypedPasswordError(response.matchingPasswordsError);
        setRegisterError(response.registerError);
    }, [
        email,
        password,
        retypedPassword,
        register,
        setEmailError,
        setPasswordError,
        setRetypedPasswordError,
        setRegisterError
    ]);

    const showStrength = useCallback(async () => {
        const result = await validateStrongPassword(password);
        const { score, status, percent } = result.strength;
        console.log(result.strength);
        setPasswordStrength({ score, status, percent })
    }, [password, validateStrongPassword]);

    useEffect(() => {
        showStrength();
    }, [showStrength]);

    return (
        <Form title="Register">
            <div style={{ color: "red" }}>
                {registerError && "An error has occurred. Please revise your informations and try again."}
            </div>
            <FormInput
                id="login-input-email"
                label="Email"
                placeholder="email"
                autoFocus={false}
                type="email"
                value={email}
                setValue={setEmail}
                error={emailError}
                setError={setEmailError}
                errorMessage={
                    emailError === "emptyEmail" && "Email cannot be empty" ||
                    emailError === "invalidEmail" && "Please provide a valid email" ||
                    emailError === "emailUnavailable" && "Email is unavailable"
                }
                validateInput={checkEmailExists}
                mode={mode}
            />
            <FormInput
                id="login-input-password"
                label="Password"
                placeholder="password"
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

            <div className={
                passwordStrength?.status === "Empty" ? "password-strength-meter password-strength-meter--empty" :
                    passwordStrength?.status === "veryWeak" ? "password-strength-meter password-strength-meter--very-weak" :
                        passwordStrength?.status === "weak" ? "password-strength-meter password-strength-meter--weak" :
                            passwordStrength?.status === "medium" ? "password-strength-meter password-strength-meter--medium" :
                                passwordStrength?.status === "strong" ? "password-strength-meter password-strength-meter--strong" :
                                    passwordStrength?.status === "veryStrong" ? "password-strength-meter password-strength-meter--very-strong" :
                                        passwordStrength?.status === "perfect" ? "password-strength-meter password-strength-meter--perfect" : ""
            }>
                <span>{passwordStrength?.score ? `score:  ${passwordStrength?.score}` : `score: ${0}`}</span>
                <span>{
                    passwordStrength?.status ? `status:  
                     
                        ${passwordStrength?.status === "Empty" ? "empty" : ""}
                        ${passwordStrength?.status === "veryWeak" ? "very weak" : ""}
                        ${passwordStrength?.status === "weak" ? "weak" : ""}
                        ${passwordStrength?.status === "medium" ? "medium" : ""}
                        ${passwordStrength?.status === "strong" ? "strong" : ""}
                        ${passwordStrength?.status === "veryStrong" ? "very strong" : ""}
                        ${passwordStrength?.status === "perfect" ? "perfect" : ""}
                    ` : ""
                }</span>
                <span>{passwordStrength?.percent ? `percent:  ${passwordStrength?.percent}` : `score: ${0}`}</span>
            </div>

            <FormInput
                id="login-input-password-retype"
                label="Retype password"
                placeholder="retype password"
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
                    label="Register"
                    buttonName="submit"
                    baseClassName="authentication-button"
                    onClick={submit}
                />
                <Button
                    className="login"
                >
                    <Link href="/auth/login">Go to Login</Link>
                </Button>
                <Button className="clear" onClick={() => {
                    setEmail("");
                    setPassword("");
                    setRetypedPassword("");
                }}>
                    Clear
                </Button>
            </FormButtonsGroup>

            <LoadingPane loading={working} />
        </Form>
    );
}