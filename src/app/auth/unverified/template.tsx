import Header from "../layoutComponents/Header";
import Footer from "../layoutComponents/Footer";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <div className="unverified">
            <Header className="unverified__header" />
            <main className="unverified__main">
                <div className="unverified__main__content">
                    { children }
                </div>
            </main>
            <Footer className="unverified__footer" />
        </div>
    );
}