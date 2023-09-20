"use client";

import {NextFont} from "next/dist/compiled/@next/font";
import {ReactNode} from "react";
import {MantineCustomThemeProvider} from "tp-kit/components";

interface ProvidersProps {
    font: NextFont
    children : ReactNode
}
export default function Providers({font, children}: ProvidersProps) {
    return (
        <MantineCustomThemeProvider font={font}>{children}</MantineCustomThemeProvider>
    )
}