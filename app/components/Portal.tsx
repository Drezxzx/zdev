"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children }: { children: React.ReactNode }) => {
    const [mounted, setMounted] = useState(false);
    const elRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        elRef.current = document.createElement("div");
        const portalRoot = document.getElementById("portal-root");
        if (portalRoot && elRef.current) {
            portalRoot.appendChild(elRef.current);
        }
        setMounted(true);

        return () => {
            if (portalRoot && elRef.current) {
                portalRoot.removeChild(elRef.current);
            }
        };
    }, []);

    return mounted && elRef.current ? createPortal(children, elRef.current) : null;
};

export default Portal;
