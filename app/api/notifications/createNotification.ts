
export default async function createNotification(userId: string, message: string) {
    const res = await fetch("http://localhost:3000/api/notifications", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId,
            message,
        }),
    });

    if (!res.ok) {
        throw new Error("Failed to create notification");
    }

    return true;
}