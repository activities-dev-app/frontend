import { LoadingPane } from "@/app/auth/components";
import { cookies } from "next/headers";
import image from "../images/undraw_mail_sent_re_0ofv.svg"
import Image from "next/image";

export default function Page() {

    const email = cookies().get("forgot_email")?.value;

    if (!email) return <LoadingPane loading={true} />

    return (
        <div className="success">
            <h1 className="title">Success</h1>

            <div className="success__image">
                <Image
                    src={image}
                    alt="Envelope with card showing a checkmark icon"
                    width={200}
                />
            </div>

            <p className="secondary-text">
                An email was sent to <b>{email}</b>, with a link to reset your password.
            </p>
        </div>
    );
}