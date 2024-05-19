import { ResetPassword } from "@/app/auth/context";
import Header from "../layoutComponents/Header";
import Footer from "../layoutComponents/Footer";

export default function Template({ children }: { children: React.ReactNode }) {

    return (
        <ResetPassword>
            <div className="password">
                <Header className="password__header" />
                <main className="password__main">
                    <div className="password__main__content">
                        {children}
                    </div>
                </main>
                <Footer className="password__footer" />
            </div>
        </ResetPassword>
    );
}