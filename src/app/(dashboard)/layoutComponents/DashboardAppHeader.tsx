"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "@/context";
import { Mode } from "@/context/ThemeContext";
import { ThemeSelector, Button } from "@/components";
import { useAuth, useSession } from "@/app/auth/context";
import Icon from "@/icons";
import Link from "next/link";


export default function DashboardAppHeader() {
    const { mode } = useTheme();

    return (
        <header className="app-header">
            <Menu mode={mode} />
            <Admin mode={mode} />
        </header>
    );
}


const Menu = memo(({ mode }: { mode: Mode }) => {
    return (
        <div className="app-header__menu">
            <Link
                href="/"
                className={`app-header__menu__links app-header__menu__links--${mode}`}>
                Home
            </Link>
            <Link
                href="/dashboard"
                className={`app-header__menu__links app-header__menu__links--${mode}`}>
                Dashboard
            </Link>
        </div>
    );
});
Menu.displayName = "Menu";


const Admin = memo(({ mode }: { mode: Mode }) => {

    const { 
        adminUserRef, 
        showMenu,
        setShowMenu,
        session,
        logUserOut,
    } = useLogout();

    return (
        <div className={`app-header__admin app-header__admin--${mode}`}>
            <ThemeSelector />
            <div className="app-header__admin__user" ref={adminUserRef}>
                <Button onClick={() => setShowMenu(!showMenu)}>
                    <Icon
                        icon="user-circle"
                        className="app-header__admin__user__icon"
                    />
                </Button>
                {
                    showMenu &&
                    (

                        <div className={`app-header__admin__user__content app-header__admin__user__content--${mode}`}>
                            {session?.email}
                            <Link
                                href={"/account"}
                                className="app-header__menu__links">
                                Account
                            </Link>
                            <Button className="button" onClick={logUserOut}>Logout</Button>
                        </div>
                    )
                }
            </div>
        </div>

    );
});
Admin.displayName = "Admin";


const useLogout = () => {
    const adminUserRef = useRef<HTMLDivElement>(null);
    const [showMenu, setShowMenu] = useState(false);
    const { logout } = useAuth();
    const { session } = useSession();

    useEffect(() => {
        const dismissAdmin = (e: MouseEvent) => {
            if (adminUserRef.current?.contains(e.target as Node)) {
                return null;
            }
            setShowMenu(false);
        };

        document.addEventListener("click", dismissAdmin);

        return () => {
            document.removeEventListener("click", dismissAdmin);
        }
    }, [setShowMenu]);

    const logUserOut = useCallback(async () => {
        setShowMenu(false);
        await logout();
    }, [logout]);

    return {
        adminUserRef,
        showMenu,
        setShowMenu,
        session,
        logUserOut,
    };
};
