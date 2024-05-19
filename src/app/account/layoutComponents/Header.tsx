import Link from "next/link";

export default function Header({ className }: { className?: string }) {
    return (
        <header className={className}>
            <button className={className ? `button button-home ${className}__button` : "button button-home"}>
                <Link href={"/"}>Activities Manager</Link>
            </button>
       </header>
    );
}