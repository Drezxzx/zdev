import Proyects from "./Proyects";

export default function Aside() {
    return (
        <aside className="w-[20%] mt-24 hidden fixed h-screen lg:flex flex-col  pl-[3rem]  items-center justify-start">
            <Proyects/>
        </aside>
    )
}