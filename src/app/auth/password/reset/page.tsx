
import { LoadingPane } from "@/app/auth/components";
import { redirectTo } from "@/app/actions";
import { cookies } from "next/headers";
import Reset from "./Reset";

export default async function Page() {

    const token = cookies().get("reset_token")?.value;

    if (!token) {
        return (
            <div>
                <h2>No token found.</h2>
            </div>
        );
    }

    return (
        <Reset token={token} />
    );
}