import Link from "next/link";

export default function Beadge  ({children, href} : {children :React.ReactNode, href : string}) {
    return(
        <Link target="_blank" className="hover:bg-slate-200/50 text-sm transition-all  border border-slate-200/45 rounded-full text-white px-2 py-1 flex gap-1" href={href}>{children}</Link>
    )
}