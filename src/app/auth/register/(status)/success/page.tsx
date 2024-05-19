import { cookies } from "next/headers";

export default function Page() {

    const email = cookies().get("user_email")?.value;

    return (
        <div className="authentication__status__success">
            <h2 className="main-text">Success!</h2>

            <p className="secondary-text">An email was sent to <b>{ email }</b></p>
        </div>
    );
}