"use client";

import {NextFont} from "next/dist/compiled/@next/font";
import {ReactNode} from "react";
import {MantineCustomThemeProvider} from "tp-kit/components";

interface ProvidersProps {
    font: NextFont
    children : ReactNode
}

// Ptit tips pour Marina : Provider =
// Le provider est un composant "général" qui donne des règles (un contexte)
// à ses composants enfants.
// Ici on change le theme des composants Mantine, cela s'appliquera à tous les
// composants dans le composant, la balise <Provider>
export default function Providers({font, children}: ProvidersProps) {
    return (
        <MantineCustomThemeProvider font={font}>{children}</MantineCustomThemeProvider>
    )
}