import React from "react";
import logo from "../assets/WriteFlowLogo.png";

export default function Logo() {
    return (
        <div
            
            className="w-40 h-25 overflow-hidden flex items-center justify-center"
        >
            <img
                src={logo}
                alt="WriteFlow Logo"
                className="w-full scale-[1.10] object-contain"
            />
        </div>
    );
}