import Link from "next/link";

export default async function Page() {
    
    return (
        <div className="callback__confirm__success">
            <h2 className="main-text">Success!</h2>

            <p className="secondary-text">User verified successfully.</p>

            <Link
                className="button callback__confirm__success__button"
                href={`/auth/login`}>
                Go to login
            </Link>
        </div>
    );
}