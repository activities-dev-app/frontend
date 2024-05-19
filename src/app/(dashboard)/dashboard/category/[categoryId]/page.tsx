"use client";

import { Activities } from "@/app/(dashboard)/components";
import { useParams } from "next/navigation";

export default function Page() {

    const { categoryId } = useParams<{ categoryId: string }>();

    return <Activities categoryId={categoryId} />;
}