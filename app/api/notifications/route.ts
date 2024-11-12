import client from "@/app/conn/conn";
import { NextResponse } from "next/server";

/* <--Tipos de notificaciones-->
1 -->  POST
2 --> PERFIL
3 --> ANY
*/

export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = url.searchParams.get("page")
  const getAll = url.searchParams.get("all")
  const userEmail = url.searchParams.get("email")

  const pageNumber = page ? Number(page) : 0

  if(getAll === "true") {
    try {
      const res = await client.execute({
        sql: `
        SELECT * FROM notifications WHERE user_id = (SELECT id FROM users WHERE email = ?) ORDER BY created_at DESC LIMIT 10 OFFSET ?`,
        args: [userEmail, pageNumber * 10]
      })
      return NextResponse.json(res.rows, { status: 200 })
    } catch (error) {
      console.log(error)
      return NextResponse.json({ error: "Error al obtener notificaciones" }, { status: 500 })
    }
  
  }

  try {
    const res = await client.execute({
      sql: `
      SELECT * FROM notifications WHERE user_id = (SELECT id FROM users WHERE email = ?) AND NOT viewed ORDER BY created_at DESC LIMIT 10 OFFSET ?`,
      args: [userEmail, pageNumber * 10]
    })

    if (pageNumber > 0) {
      const res = await updateNotificacion({pageNumber, userEmail : userEmail as string})
      if (!res) return NextResponse.json({ error: "Error al actualizar notificaciones" }, { status: 500 })
    }

    return NextResponse.json(res.rows, { status: 200 })

  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Error al obtener notificaciones" }, { status: 500 })
  }

}


export async function POST(req: Request) {
  const body = await req.json()
  const { userEmail, message, idType, idPost, idProfile, checkIfIsTheSame } = body

  if(checkIfIsTheSame){
    try {
      const checkIfExistThisNotification = await client.execute({
        sql: `SELECT * FROM notifications WHERE user_id = (SELECT id FROM users WHERE email = ?) AND notification = ? AND idType = ? AND idPost = ? AND idProfile = ?`,
        args: [userEmail, message, idType, idPost, idProfile]
      })
  
      if (checkIfExistThisNotification.rows.length > 0) return NextResponse.json({ "error": "Ya existe una notificación con ese contenido" }, { status: 400 })
  
      const res = await client.execute({
        sql: `
          INSERT INTO notifications (user_id, notification,created_at,idType, idPost, idProfile )
          VALUES ((SELECT id FROM users WHERE email = ?),?,CURRENT_TIME,?, ?, ?)`,
        args: [userEmail, message, idType, idPost, idProfile]
      })
  
      return NextResponse.json(res, { status: 200 })
    } catch (error) {
      console.log(error)
      return NextResponse.json({ error: "Error al crear notificacion" }, { status: 500 })
    }
  }

  const res = await client.execute({
    sql: `
      INSERT INTO notifications (user_id, notification,created_at,idType, idPost, idProfile )
      VALUES ((SELECT id FROM users WHERE email = ?),?,CURRENT_TIME,?, ?, ?)`,
    args: [userEmail, message, idType, idPost, idProfile]
  })

  return NextResponse.json(res, { status: 200 })

}

export async function DELETE(req: Request) {
  const { email } = await req.json()
  
  try {
    const res = await client.execute({
      sql: `
      DELETE FROM notifications
      WHERE user_id = (SELECT id FROM users WHERE email = ?)
      `,
      args: [email]
    })

    return NextResponse.json(res, { status: 200 })

  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Error al eliminar notificacion" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  const body = await req.json()
  const { userEmail, pageNumber } = body

  try {
    const res = await client.execute({
      sql : `UPDATE notifications
            SET viewed = 1
            WHERE id IN (
                SELECT id
                FROM notifications
                WHERE user_id = (SELECT id FROM users WHERE email = ?)
                  AND NOT viewed
                ORDER BY created_at DESC
                LIMIT 10 OFFSET ?
            );
            ;
      `,
      args : [userEmail, pageNumber]
    })
    return NextResponse.json(res.rowsAffected > 0, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Error al actualizar notificaciones" }, { status: 500 })
  }

  
}

export async function createNotification({ userEmail, message, idPost, idProfile, idType, checkIfIsTheSame }: { userEmail: string, message: string, idType: "1" | "2" | "3", idPost: string, idProfile: string, checkIfIsTheSame: boolean }): Promise<boolean> {

  idPost === "" ? "0" : idPost
  idProfile === "" ? "0" : idProfile

  const res = await fetch("https://zdev.es/api/notifications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      checkIfIsTheSame,
      userEmail,
      message,
      idType,
      idPost,
      idProfile,
    }),
  });

  return res.ok ? true : false;
}

export async function updateNotificacion({pageNumber, userEmail}: {pageNumber : number, userEmail : string }) {
  try {
    const res = await fetch("https://zdev.es/api/notifications", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail,
        pageNumber,
      }),
    });
  
    return res.ok ? true : false;
  } catch (error) {
    console.log(error);
    return false;
  }
}