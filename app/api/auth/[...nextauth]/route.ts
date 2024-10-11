import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
            profile(profile) {
                return {
                    id: profile.id,
                    name: profile.name,
                    username: profile.login,
                    email: profile.email,
                    image: profile.avatar_url
                };
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            profile(profile) {
                return {
                    id: profile.sub, 
                    name: profile.name,
                    username: profile.email.split('@')[0],
                    email: profile.email,
                    image: profile.picture, 
                };
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.userId = user.id;
                token.username = user.username; // Ahora debería estar disponible
                token.name = user.name; // Nombre completo
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.userId as string; // Agrega el ID al objeto de sesión
            session.user.username = token.username as string; // Agrega el nombre de usuario a la sesión
            session.user.name = token.name as string; // Agrega el nombre completo a la sesión
            return session;
        },
    },
});

export { handler as GET, handler as POST };
