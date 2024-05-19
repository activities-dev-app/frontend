"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { LocalSession } from "@/types";
import { redirectTo } from "@/app/actions";
import { User } from "@/models";
import * as validation from "@/app/auth/actions/validationStore";
import * as authActions from "@/app/auth/actions/authenticationStore";
import * as sessionActions from "@/app/auth/actions/sessionStore";
import * as emailActions from "@/app/auth/actions/emailStore";
import * as userActions from "@/app/auth/actions/userStore";
import * as passwordActions from "@/app/auth/actions/passwordStore";
import { deleteCookie } from "@/app/auth/actions/cookieStore";

import { appData } from "@/app/(dashboard)/context/DataContext";


type LoginResponseType = {
    emailError: string | boolean | null;
    passwordError: string | boolean | null;
    loginError: string | boolean | null;
};

type RegisterResponseType = {
    emailError: string | boolean | null;
    passwordError: string | boolean | null;
    matchingPasswordsError: string | boolean | null;
    registerError: string | boolean | null;
};

/* Auth Provider */
type Auth = {
    //login: ({ email, password }: { email: string; password: string }) => Promise<void>;
    login: ({ email, password }: {
        email: string;
        password: string;
        rememberMe: boolean;
    }) => Promise<LoginResponseType>;

    register: ({ email, password, retypedPassword }: {
        email: string;
        password: string;
        retypedPassword: string;
    }) => Promise<RegisterResponseType>;

    logout: () => Promise<void>;

    working: boolean;
};

const Context = createContext<Auth>({
    login: async () => { return { emailError: null, loginError: null, passwordError: null } },
    logout: async () => { },
    register: async () => { return { emailError: null, matchingPasswordsError: null, passwordError: null, registerError: null } },
    working: false,
});

export default function AuthContext({ children }: { children: React.ReactNode }) {

    const { loading, setLoading } = useLoadingHook();

    const { login } = useLogin({ setLoading });

    const { register } = useRegister({ setLoading });

    const { logout } = useLogout({ setLoading });

    return (
        <Context.Provider value={{
            login,
            logout,
            register,
            working: loading,
        }}>
            <Confirmation>
                <Session>
                    {children}
                </Session>
            </Confirmation>
        </Context.Provider>
    );
}


/* Loader hook */
const useLoadingHook = () => {
    const [loading, setLoading] = useState<boolean>(false);
    return { loading, setLoading };
};

const useLogin = ({
    setLoading
}: {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {

    const login = useCallback(async ({ email, password, rememberMe = false }: { email: string, password: string, rememberMe: boolean }) => {

        setLoading(true);

        const validated = await validation.validateLogin({ email, password });

        const loginResponse: LoginResponseType = {
            emailError: null,
            passwordError: null,
            loginError: null,
        };

        if (validated.emailError || validated.passwordError) {
            setLoading(false);
            return { ...loginResponse, ...validated } as LoginResponseType;
        } else {
            const response = await authActions.login({ email, password, rememberMe })  // Returns undefined on successful redirects, success === false on login errors

            if (response) {
                const { success, error } = response;
                if (!success) {
                    setLoading(false);

                    if (error && error === "ECONNREFUSED") {
                        return { ...loginResponse, ...{ loginError: "connectionError" } } as LoginResponseType;
                    }
                    return { ...loginResponse, ...{ loginError: "LoginError" } } as LoginResponseType;
                }

                return { ...loginResponse, ...{ loginError: null } } as LoginResponseType;
            }

            return { ...loginResponse, ...{ loginError: null } } as LoginResponseType;
        }

    }, [setLoading]);

    return { login };
};

const useRegister = ({
    setLoading
}: {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {

    const register = useCallback(async ({
        email, password, retypedPassword
    }: {
        email: string, password: string, retypedPassword: string
    }) => {

        setLoading(true);

        let registerResponse: RegisterResponseType = {
            emailError: null,
            matchingPasswordsError: null,
            passwordError: null,
            registerError: null,
        };

        const emailError = await validation.validateEmail(email);
        if (!emailError) {
            const emailFound = await userActions.emailExists(email);
            if (emailFound) {
                setLoading(false);
                return {
                    ...registerResponse,
                    ...{ emailError: "emailUnavailable" }
                } as RegisterResponseType;
            }
        }

        const validated = await validation.validateRegistration({
            email, password, retypedPassword,
        });

        console.log("validated: ", validated);

        const condition =
            validated.emailError ||
            validated.passwordError ||
            validated.passwordsMatchError

        if (condition) {
            setLoading(false);
            return { ...registerResponse, ...validated };
        } else {
            const newUser = (
                new User({ email, name: "", username: "" })
            ).getUser();

            const response = await authActions.register({
                user: newUser,
                password
            });

            if (response) {
                const { success } = response;

                if (!success) {
                    setLoading(false);
                    return {
                        ...registerResponse,
                        ...{ registerError: "registerError" }
                    } as RegisterResponseType;
                }

                return { ...registerResponse, ...{ registerError: null } } as RegisterResponseType;
            }

            return { ...registerResponse, ...{ registerError: null } } as RegisterResponseType;
        }

    }, [setLoading]);

    return { register };
};

const useLogout = ({ setLoading }: { setLoading: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const { setSession } = useSessionHook();

    const logout = useCallback(async () => {
        setLoading(true);
        authActions.logout()
            .then(() => {
                setSession(null);
                appData.clear();
                setLoading(false);
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }, [setSession, setLoading]);

    return { logout };
};

export const useAuth = () => useContext<Auth>(Context);


/* Session provider */
type Session = {
    session: LocalSession;
    setSession: React.Dispatch<React.SetStateAction<LocalSession>>;
    getSession: () => void;
};

const SessionContext = createContext<Session>({
    getSession: () => { },
    session: null,
    setSession: () => { },
});

const useSessionHook = () => {
    const [session, setSession] = useState<LocalSession>(null);

    const getSession = useCallback(() => {
        sessionActions.getSession()
            .then(localSession => {
                setSession(localSession);
                return localSession;
            })
            .then(localSession => {
                if (!localSession) {
                    deleteCookie();
                    if (window.location.pathname.startsWith("/dashboard")) {
                        redirectTo("/auth/login");
                    }
                }
            })
            .catch(err => console.log("GET SESSION ERROR: ", err));
    }, [setSession]);

    /* Without this the app has no session after login */
    useEffect(() => {
        getSession();
    }, [getSession]);

    useEffect(() => {
        const onAppFocus = () => {
            sessionActions.checkSession(window.location.pathname);
        };

        document.addEventListener("focus", onAppFocus);

        return () => {
            document.removeEventListener("focus", onAppFocus);
        }
    }, [getSession]);

    return { getSession, session, setSession };
};

function Session({ children }: { children: React.ReactNode }) {
    return (
        <SessionContext.Provider value={{ ...useSessionHook() }}>
            {children}
        </SessionContext.Provider>
    );
}

export const useSession = () => useContext<Session>(SessionContext);


/* Confirmation Provider */
type Confirmation = {
    sendConfirmationEmail: (email: string) => Promise<{ success: boolean }>;
    emaiConfirmationSequence: ({ email, token }: {
        email: string;
        token: string;
    }) => Promise<void>
    message: string;
    success: boolean;
}

const ConfirmationContext = createContext<Confirmation>({
    sendConfirmationEmail: async (email) => {
        return { success: false }
    },
    emaiConfirmationSequence: async () => { },
    message: "",
    success: false
});

const useConfirmationHook = () => {
    const { setLoading } = useLoadingHook();
    const [message, setMessage] = useState<string>("");
    const [success, setSuccess] = useState<boolean>(false);

    const sendConfirmationEmail = useCallback(async (email: string) => {
        return emailActions.sendConfirmationEmail(email);
    }, []);

    const emaiConfirmationSequence = useCallback(async ({
        email, token
    }: {
        email: string,
        token: string,
    }) => {
        setLoading(true);
        userActions.getUserkeyByEmail(email) /* Get user */
            .then(key => {
                userActions.setUserAsVerified(key) /* Update */
                    .then(r => {
                        if (!r) {
                            setMessage("Email confirmed successfully");
                        }
                    })
                    .then(() => {
                        emailActions.deleteConfirmationToken(token); /* Delete token */
                    })
                    .then(() => {
                        setSuccess(true);
                    })
                    .catch(err => {
                        console.log("Verify user error: ", err);
                        setSuccess(false);
                        setMessage("Error. Please try again");
                    });
            })
            .catch(err => {
                console.log("getUserkeyByEmail (Error):", err);
                setSuccess(false);
                setMessage("Error. Please try again");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [
        setLoading,
        setMessage,
        setSuccess,
    ]);

    return {
        sendConfirmationEmail,
        emaiConfirmationSequence,
        message,
        success,
    };
};

function Confirmation({ children }: { children: React.ReactNode }) {
    return (
        <ConfirmationContext.Provider value={{ ...useConfirmationHook() }}>
            {children}
        </ConfirmationContext.Provider>
    );
}

export const useConfirmation = () => useContext<Confirmation>(ConfirmationContext);


/* Reset Password Provider */
type ResetPassword = {
    sendResetPasswordEmail: (email: string) => Promise<{ success: boolean }>;
    updatePassword: (email: string, p1: string, p2: string) => void;
    currentEmail: string | null;
    setCurrentEmail: React.Dispatch<React.SetStateAction<string | null>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResetPasswordContext = createContext<ResetPassword>({
    sendResetPasswordEmail: async () => { return { success: false } },
    updatePassword: () => { },
    currentEmail: null,
    setCurrentEmail: () => { },
    loading: false,
    setLoading: () => { },
});

const useResetPasswordHook = () => {

    const [currentEmail, setCurrentEmail] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const sendResetPasswordEmail = useCallback(async (email: string) => {
        return await emailActions.sendResetPasswordEmail(email) as { success: boolean };
    }, []);

    const updatePassword = useCallback(async (email: string, p1: string, p2: string) => {

        await validation.validatePassword(p1);
        await validation.validatePasswordsAreEqual(p1, p2);

        const validated = await validation.validateRegistration({
            email, password: p1, retypedPassword: p2
        });

        console.log("validated: ", validated);
        console.log(email, p1, p2);

        if (validated) {
            const response = await passwordActions.resetPassword({ email, p1, p2 });
            console.log(response);
        } else {
            console.log("What happened?")
        }
    }, []);

    return {
        sendResetPasswordEmail,
        updatePassword,
        currentEmail,
        setCurrentEmail,
        loading,
        setLoading,
    };
};

export function ResetPassword({ children }: { children: React.ReactNode }) {
    return (
        <ResetPasswordContext.Provider value={{ ...useResetPasswordHook() }}>
            {children}
        </ResetPasswordContext.Provider>
    );
}

export const useResetPassword = () => useContext<ResetPassword>(ResetPasswordContext);