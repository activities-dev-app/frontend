import Header from "../layoutComponents/Header";
import Footer from "../layoutComponents/Footer";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <div className="authentication__register">
            <Header className="authentication__header authentication__register__header" />
            <main className="authentication__main authentication__register__main">
                <div className="authentication__main__content authentication__register__main__content">
                    { children }
                </div>
            </main>
            <Footer className="authentication__footer authentication__register__footer" />
        </div>
    );
}