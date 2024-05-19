"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/app/auth/context";
import { Button } from "@/components";
import { Form, FormInput, FormButtonsGroup } from "@/components/forms";
import { LoadingPane } from "./loadingPane";
import { useValidation } from "../hooks";
import Icon from "@/icons";
import Link from "next/link";

export default function Login() {

    const mode = "light"

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [rememberMe, setRememberMe] = useState<boolean>(false);

    const { login, working } = useAuth();

    useEffect(() => {
        console.log(rememberMe);
    }, [rememberMe]);
    const {
        resetErrors,
        validateEmail,
        validatePassword,
        emailError,
        setEmailError,
        passwordError,
        setPasswordError,
        loginError,
        setLoginError,
    } = useValidation();

    useEffect(() => {
        resetErrors();
    }, [resetErrors]);

    const submit = useCallback(async () => {
        const response = await login({ email, password, rememberMe });
        setEmailError(response.emailError);
        setPasswordError(response.passwordError);
        setLoginError(response.loginError);
    }, [email, password, login, setEmailError, setPasswordError, setLoginError, rememberMe]);

    return (
        <Form title="Login">
            <div style={{ color: "red" }}>
                {loginError === "loginError" && "Login error. Please verify your credentials and try again."}
                {loginError === "connectionError" && "Server error. Please try again in a few minutes."}
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
                    emailError === "invalidEmail" && "Please provide a valid email"
                }
                validateInput={validateEmail}
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

            <FormButtonsGroup>
                <div className="form-buttons-group__row-1">
                    <Button
                        label="Login"
                        buttonName="submit"
                        baseClassName="authentication-button"
                        onClick={submit}
                    />
                    <div>
                        <span>{"Does'n have an account yet?"}</span>
                        <Button
                            className="register"
                        >
                            <Link href={`/auth/register`}>Register</Link>
                        </Button>
                    </div>
                </div>
                <div className="form-buttons-group__row-2">
                    <label htmlFor="remember-me" className="checkbox__label">
                        <div className="checkbox__icon">
                            {
                                rememberMe ?
                                <Icon icon="checkbox" /> :
                                <Icon icon="square" />
                            }
                        </div>
                        <input
                            id="remember-me"
                            className="checkbox"
                            type="checkbox"
                            value={"rememberMe"}
                            onChange={e => setRememberMe(e.currentTarget.checked)}
                        />
                        <span>Remember me</span>
                    </label>
                    <Button className="forgot">
                        <Link href={`/auth/password/forgot`}>{"Forgot password?"}</Link>
                    </Button>
                </div>
            </FormButtonsGroup>

            <LoadingPane loading={working} />
        </Form >
    );
}