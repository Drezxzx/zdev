import client from "@/app/conn/conn";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const email = url.searchParams.get("email") as string;
    console.log(email);

    try {
        const res = await client.execute({
            sql : `  SELECT u.name, u.username, u.profile_pic, u.id, u.is_verified
                    FROM users_languages as ul
                    INNER JOIN users as u ON u.id = ul.user_id
                    LEFT JOIN  follow_users as fu ON fu.user_id = u.id
                    WHERE ul.language_id IN
                        (
                        SELECT ul1.language_id 
                        FROM users
                        INNER JOIN users_languages as ul1 ON ul1.user_id = users.id
                        WHERE users.email = ?
                        )
                    AND u.email <> ?
                    AND u.id NOT IN (SELECT followed_user_id FROM follow_users WHERE user_id = (SELECT id FROM users WHERE email = ?))
                    GROUP BY u.id
                    ORDER BY u.is_verified DESC
                    LIMIT 5;
                     `,
                    args: [email, email, email]
        })

        return Response.json(res.rows, { status: 200 });
    } catch (error) {
        console.log(error);
        return Response.json({ error: "Server error" }, { status: 500 });
    }

}