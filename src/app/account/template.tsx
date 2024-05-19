import Footer from "./layoutComponents/Footer";
import Header from "./layoutComponents/Header";

export default function Template({ children }: { children: React.ReactNode }) {

    return (
        <div className="account">
            <Header className="account__header"/>
            <main className="account__main">
                <div className="account__main__content">
                    {children}
                </div>
            </main>
            <Footer className="account__footer"/>
        </div>
    );
}
