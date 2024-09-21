
import CreatePost from "./components/CreatePost";
import HeaderDesktop from "./components/Header";
import Posts from "./components/Posts";


export  default async function Home() {
  return (
    <>
      <HeaderDesktop/>
      <main className="w-screen h-auto  flex flex-col items-center justify-center">
      <Posts />
    </main>
    </>
    
  );
}
