import { redirectTo } from "@/app/actions";
import { Loading } from "@/components";
import { cookies } from "next/headers";

export default function Page() {

    const email = cookies().get("unverified_email")?.value;

    if (!email) {
        setTimeout(() => {
            redirectTo("/auth/login");
        }, 5000);

        return <Loading />
    }

    return (
        <div className="unverified__success">
            <h2 className="main-text">Success!</h2>

            <p className="secondary-text">
                A link was sent to <b>{email}</b>.
                <br />
                Click the link to activate your account.
            </p>
        </div>
    );
}