import Link from "next/link";
import { Footer, Header } from "./layoutComponents";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="container homepage-container">
            <div className="homepage-auth-area">
                <button className="button homepage-auth-area__login">
                    <Link href={"/auth/login"}>Login</Link>
                </button>
                <button className="button homepage-auth-area__login">
                    <Link href={"/auth/register"}>Register</Link>
                </button>
            </div>
            <Header />
            <main className="main">
                {children}
            </main>
            <Footer />
        </div>
    );
}