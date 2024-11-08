export { default } from "next-auth/middleware";

// Especifica únicamente las rutas que quieres proteger
export const config = {
    matcher: ["/home", "/profile"],
};
