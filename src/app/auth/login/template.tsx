import Footer from "../layoutComponents/Footer";
import Header from "../layoutComponents/Header";

export default function Page({ children }: { children: React.ReactNode }) {
    return (
        <div className="authentication__login">
            <Header className="authentication__header authentication__login__header" />
            <main className="authentication__main authentication__login__main">
                <div className="authentication__main__content authentication__login__main__content">
                    { children }
                </div>
            </main>
            <Footer className="authentication__footer authentication__login__footer"/>
        </div>
    );
}