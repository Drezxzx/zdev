"use client";

import { IconArrowBack } from "@tabler/icons-react";
import Link from "next/link";

export default function DetailPost({ params }: { params: { post_id: string } }) {
    const post_id = params.post_id
    return (
        <div>
            <Link href="/">
                <IconArrowBack />
            </Link>
            <h1>Post {post_id}</h1>
        </div>
    )
}