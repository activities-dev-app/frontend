import { useCallback, useEffect, useState } from "react";
import * as validation from "@/app/auth/actions/validationStore";
import * as userActions from "@/app/auth/actions/userStore";
type EmailError = null | boolean | string;
type PasswordError = null | boolean | string;
type RetypedPasswordError = null | boolean | string;
type LoginError = null | boolean | string;
type RegisterError = null | boolean | string;


export const useValidation = () => {
    const [emailError, setEmailError] = useState<EmailError>(null);
    const [passwordError, setPasswordError] = useState<PasswordError>(null);
    const [retypedPasswordError, setRetypedPasswordError] = useState<RetypedPasswordError>(null);
    const [loginError, setLoginError] = useState<LoginError>(null);
    const [registerError, setRegisterError] = useState<RegisterError>(null);

    const checkEmailExists = useCallback(async (email: string) => {
        /* Validates email and then check if it exists */
        const validated = await validation.validateEmail(email);
        setEmailError(validated.error);

        if (!validated.error) {
            const emailFound = await userActions.emailExists(email);
            //console.log("Email found: ", emailFound);
            if (emailFound) {
                setEmailError("emailUnavailable");
            }
        }
    }, [setEmailError]);

    const validateEmail = useCallback(async (email: string) => {
        /* Validates email only */
        const validated = await validation.validateEmail(email);
        console.log("Email error: ", validated);
        setEmailError(validated.error);
    }, [setEmailError]);

    const validatePassword = useCallback(async (password: string) => {
        const validated = await validation.validatePassword(password);
        console.log("Password error: ", validated);
        setPasswordError(validated.error);
        setPasswordError(validated.error);
    }, [setPasswordError]);

    const validatePasswordsAreEqual = useCallback(async (p1: string, p2: string) => {
        const validated = await validation.validatePasswordsAreEqual(p1, p2);
        setRetypedPasswordError(validated.error);
    }, [setRetypedPasswordError]);

    const validateStrongPassword = useCallback( async (password: string) => {
        return await validation.validateStrongPassword(password);
    }, []);

    const resetErrors = useCallback(() => {
        setEmailError(null);
        setPasswordError(null);
        setRetypedPasswordError(null);
        setLoginError(null)
    }, [setEmailError, setPasswordError, setRetypedPasswordError, setLoginError]);

    useEffect(() => {
        console.log(emailError, passwordError, retypedPasswordError);
    }, [emailError, passwordError, retypedPasswordError]);

    return {
        emailError,
        setEmailError,
        passwordError,
        setPasswordError,
        retypedPasswordError,
        setRetypedPasswordError,
        resetErrors,
        validateEmail,
        validatePassword,
        validatePasswordsAreEqual,
        validateStrongPassword,
        checkEmailExists,
        loginError,
        setLoginError,
        registerError,
        setRegisterError,
    };
};