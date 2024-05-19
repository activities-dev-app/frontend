"use server"

/* https://github.com/validatorjs/validator.js */
import { isEmail, isStrongPassword } from "validator"; 

/* https://github.com/HamedFathi/PasswordMeter */
import { PasswordMeter } from "password-meter";

const emailErrorTypes = {
    emptyEmail: "emptyEmail",
    invalidEmail: "invalidEmail"
};

const passwordErrorTypes = {
    emptyPassword: "emptyPassword",
    tooShortPassword: "tooShortPassword",
    tooLongPassword: "tooLongPassword"
};

const retypedPasswordErrorTypes = {
    unmatchedPassword: "unmatchedPassword"
};

export async function validateEmail(email: string) {
    if (email.length === 0) {
        return { error: emailErrorTypes.emptyEmail };
    }
    console.log(email, isEmail(email));

    if (!isEmail(email)) {
        return { error: emailErrorTypes.invalidEmail };
    }
    return { error: null };
}

export async function validatePassword(password: string) {

    if (password.length === 0) {
        return { error: passwordErrorTypes.emptyPassword };
    }
    if (password.length < 8) {
        return { error: passwordErrorTypes.tooShortPassword };
    }
    if (password.length > 72) {
        return { error: passwordErrorTypes.tooLongPassword };
    }

    return { error: null };
}

export async function validateStrongPassword(password: string) {

    const isStrong = isStrongPassword(password, { 
        returnScore: true,
        minLength: 8,
    });

    const strength = new PasswordMeter().getResult(password);

    console.log(isStrong, strength);

    return { isStrong, strength };
}

export async function validatePasswordsAreEqual(p1: string, p2: string) {
    if (p1 !== p2) {
        return {
            error: retypedPasswordErrorTypes.unmatchedPassword
        };
    }
    return { error: null };
}

export async function validateLogin({
    email, password
}: {
    email: string, password: string
}) {
    const emailValidation = await validateEmail(email);
    const emailError = emailValidation.error;

    const passwordValidation = await validatePassword(password);
    const passwordError = passwordValidation.error;

    return { emailError, passwordError };
}

export async function validateRegistration({
    email, password, retypedPassword
}: {
    email: string, password: string, retypedPassword: string,
}) {
    const passwordsMatchValidation = await validatePasswordsAreEqual(password, retypedPassword);
    const passwordsMatchError = passwordsMatchValidation.error;

    const emailValidation = await validateEmail(email);
    const emailError = emailValidation.error;

    const passwordValidation = await validatePassword(password);
    const passwordError = passwordValidation.error;

    return { passwordsMatchError, emailError, passwordError };
}
