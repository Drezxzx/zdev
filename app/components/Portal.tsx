"use client";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children }: { children: React.ReactNode }) => {
    const elRef = useRef<HTMLElement | null>(null);
    if (!elRef.current) {
        elRef.current = document.createElement("div");
    }

    useEffect(() => {
        const portalRoot = document.getElementById("portal-root");
        if (portalRoot && elRef.current) {
            portalRoot.appendChild(elRef.current);
        }
        return () => {
            if (portalRoot && elRef.current) {
                portalRoot.removeChild(elRef.current);
            }
        };
    }, []);

    return elRef.current ? createPortal(children, elRef.current) : null;
};

export default Portal;
