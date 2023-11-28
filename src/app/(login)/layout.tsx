import {ZodI18nProvider} from "tp-kit/components";

export default function LoginLayout({children}: { children: React.ReactNode }) {

    return (
        <ZodI18nProvider>{children}</ZodI18nProvider>
    )
}