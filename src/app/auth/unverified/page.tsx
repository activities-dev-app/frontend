import { cookies } from "next/headers";
import Unverified from "./Unverified";

export default function Page() {

    const email = cookies().get("unverified_email")?.value;

    return (
        <Unverified email={email} />
    );
}