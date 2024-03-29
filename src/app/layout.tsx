import './globals.css'
import type {Metadata} from 'next'
import {Lexend} from 'next/font/google'
import Providers from "@/components/providers";
import {Footer, ZodI18nProvider} from "tp-kit/components";
import Menu from "@/components/menu";

const lexend = Lexend({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s - Starbucks',
    default: 'Page d\'accueil'
  },
  robots: "noindex,nofollow"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={lexend.className}>
        <Menu />
        <Providers font={lexend}>
          <ZodI18nProvider>
            {children}
          </ZodI18nProvider>
          <Footer/>
        </Providers>
      </body>
    </html>
  )
}
