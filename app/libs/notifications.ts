export class Notifications {
    static async getNotifications ({userEmail, pageNumber} : {userEmail : string, pageNumber : number}) {
        const res = await fetch("/api/notifications?page=" + pageNumber + "&email=" + userEmail, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            throw new Error("Failed to get notifications");
        }

        return res.json();

    }
    static async getAllNotifications ({userEmail, pageNumber} : {userEmail : string, pageNumber : number}) {
        const res = await fetch("/api/notifications?page=" + pageNumber + "&email=" + userEmail + "&all=true", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            throw new Error("Failed to get notifications");
        }

        return res.json();

    }

    static async deleteNotifications({ userEmail} : { userEmail : string}) {
        const res = await fetch("/api/notifications", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email :userEmail,
            })
        });

        if (!res.ok) {
            throw new Error("Failed to delete notifications");
        }

        return res.json();

    }

    static async updateNotifications({pageNumber, userEmail} : {pageNumber : number, userEmail : string}) {
        const res = await fetch("/api/notifications", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userEmail,
                pageNumber,
            }),
        });

        if (!res.ok) {
            throw new Error("Failed to update notifications");
        }

        return res.json();

    }
}