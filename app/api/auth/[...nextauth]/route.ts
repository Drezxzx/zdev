import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
            profile(profile) {
                // Aquí es donde puedes mapear los datos que necesites del perfil devuelto por GitHub
                return {
                    id: profile.id,
                    name: profile.name,
                    username: profile.login, // Aquí se encuentra el nombre de usuario en GitHub
                    email: profile.email,
                    image: profile.avatar_url
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
