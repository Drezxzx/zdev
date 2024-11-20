import client from "@/app/conn/conn";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const username = url.searchParams.get("username");

    try {
        const res = await client.execute({
            sql: `SELECT * from users_presentation WHERE idUser = (SELECT id FROM users WHERE username = ?)`,
            args: [username]
        })

        return NextResponse.json(res.rows.length > 0, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

export async function POST(req: Request) {
    const body = await req.formData();
    const username = body.get("username") as string;
    const description = body.get("description") as string;

    const languages = [
        {
          "id": 1,
          "name": "python",
          "helloWorld": "print('Hi zdev')"
        },
        {
          "id": 2,
          "name": "javascript",
          "helloWorld": "console.log('Hi zdev')"
        },
        {
          "id": 3,
          "name": "java",
          "helloWorld": `public class Main {
          public static void main(String[] args) {
              System.out.println("Hi zdev");
          }
        }`
        },
        {
          "id": 5,
          "name": "c#",
          "helloWorld": `using System;
      
      class Program {
          static void Main() {
              Console.WriteLine("Hi zdev");
          }
      }`
        },
        {
          "id": 6,
          "name": "ruby",
          "helloWorld": `puts 'Hi zdev'`
        },
        {
          "id": 7,
          "name": "php",
          "helloWorld": `<?php
      echo 'Hi zdev';
      ?>`
        },
        {
          "id": 8,
          "name": "swift",
          "helloWorld": `import Foundation
      
      print("Hi zdev")`
        },
        {
          "id": 9,
          "name": "go",
          "helloWorld": `package main
      
      import "fmt"
      
      func main() {
          fmt.Println("Hi zdev")
      }`
        },
        {
          "id": 10,
          "name": "kotlin",
          "helloWorld": `fun main() {
          println("Hi zdev")
        }`
        },
        {
          "id": 12,
          "name": "typescript",
          "helloWorld": `console.log('Hi zdev')`
        }
      ];
      


    try {
        const updateUser = await client.execute({
            sql: `UPDATE users SET description = ? WHERE username = ?`,
            args: [description, username]
        })

        const profile_pic = await client.execute({
            sql: `SELECT profile_pic FROM users WHERE username = ?`,
            args: [username]
        })
        const numberRandom = Math.floor(Math.random() * 12)
        const languaje = languages.find(lang => lang.id === numberRandom)
        console.log(username, description, profile_pic.rows[0].profile_pic as string, languaje?.id as number, languaje?.helloWorld as string)
        if (updateUser.rowsAffected > 0) {
            const createPoost = await client.execute({
                sql: `INSERT INTO posts (author_id, title , created_at, updated_at, id_language, code) 
                        VALUES (
                            (SELECT id FROM users WHERE username = ?),
                            ?,
                            CURRENT_TIMESTAMP, 
                            CURRENT_TIMESTAMP, 
                            ?,
                            ?
                        );
                        `,
                args: [username, description, languaje?.id as number, languaje?.helloWorld as string]
            })

            if (createPoost.rowsAffected > 0) {
                const deletePresentation = await client.execute({
                    sql: `DELETE FROM users_presentation WHERE idUser = (SELECT id FROM users WHERE username = ?)`,
                    args: [username]
                })

                if (deletePresentation.rowsAffected > 0) {
                    return NextResponse.json(true, { status: 200 });
                }
            } else {
                return NextResponse.json(false, { status: 200 });
            }
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

export async function DELETE(req: Request) {
    const url = new URL(req.url);
    const username = url.searchParams.get("username");

    try {
        const res = await client.execute({
            sql: `DELETE FROM users_presentation WHERE idUser = (SELECT id FROM users WHERE username = ?)`,
            args: [username]
        })

        return NextResponse.json(res.rowsAffected > 0, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

