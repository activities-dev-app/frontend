"use client"

import Link from "next/link";
import { Footer, Header } from "./layoutComponents";
import { useAuth, useSession } from "../auth/context";
import { Button } from "@/components";

export default function Layout({ children }: { children: React.ReactNode }) {

    const { session } = useSession();
    //const { logout } = useAuth();

    return (
        <div className="container homepage-container">
            <div className="homepage-auth-area">
                {session && session.active ?
                    <>
                        <p>Logged in as {session.email}</p>
                        {/* <Button className="homepage-auth-area__login" onClick={logout}>Logout</Button> */}
                    </> :
                    <>
                        <Button className="homepage-auth-area__login">
                            <Link href={"/auth/login"}>Login</Link>
                        </Button>
                        <Button className="homepage-auth-area__login">
                            <Link href={"/auth/register"}>Register</Link>
                        </Button>
                    </>
                }
            </div>
            <Header />
            <main className="main">
                {children}
            </main>
            <Footer />
        </div>
    );
}