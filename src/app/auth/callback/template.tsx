import Header from "../layoutComponents/Header";
import Footer from "../layoutComponents/Footer";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <div className="callback">
            <Header className="callback__header" />
            <main className="callback__main">
                <div className="callback__main__content">
                    { children }
                </div>
            </main>
            <Footer className="callback__footer" />
        </div>
    );
}