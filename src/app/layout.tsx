import './globals.css'
import type {Metadata} from 'next'
import {Lexend} from 'next/font/google'
import Providers from "@/components/providers";

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
    <body className={lexend.className}><Providers font={lexend}>{children}</Providers></body>
    </html>
  )
}
