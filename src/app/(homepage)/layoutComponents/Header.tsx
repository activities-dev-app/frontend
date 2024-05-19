import Link from "next/link";

export default function Header() {
    return (
        <header className="header">
            <div className="header__main">
                <h1 className="header__main__app-name">
                    Activities Manager App
                </h1>
            </div>
            <div className="header__menu">
                <nav className="header__menu__navigation">
                    <Link
                        href={"/dashboard"}
                        className="header__menu__navigation__link">
                        Dashboard
                    </Link>
                </nav>
            </div>
        </header>
    );
}