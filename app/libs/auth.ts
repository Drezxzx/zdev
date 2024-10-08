import { getServerSession } from "next-auth";

export default async function auth() : Promise<boolean> {

    const session = await getServerSession();

    return session?.user ? true : false;
}