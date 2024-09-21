// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        id: string; // O el tipo que necesites
        username: string;
    }

    interface Session {
        user: User & {
            username: string;
            id: string;
        };
    }

    interface JWT {
        username?: string;
        userId?: string;
    }
}
