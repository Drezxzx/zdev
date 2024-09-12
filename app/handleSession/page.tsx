import { getServerSession } from "next-auth";

export default async function HandleSession() {
  const session = await getServerSession();
  console.log(session);
  return (
    <div>
      <h1>Hello</h1>
      <p>You are logged in as {session?.user?.name}</p>
      <p>Your email is {session?.user?.email}</p>
      <p>your img is <img src={session?.user?.image} /></p>
    </div>
  );
}