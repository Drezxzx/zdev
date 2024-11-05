
import SuggestionsSection from "./Suggestions";
import TopLanguajes from "./TopLanguajes";

export default function Aside() {
    return (
        <aside className="w-[20%] right-[1rem] mt-24 hidden fixed h-screen lg:flex flex-col m-auto   items-center justify-start">
            <SuggestionsSection />
            <TopLanguajes/>
        </aside>
    )

}