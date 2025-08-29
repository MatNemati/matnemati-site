
import './globals.css'
import type { Metadata } from 'next'
import { Inter, Vazirmatn } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const vazir = Vazirmatn({ subsets: ['arabic'], variable: '--font-vazir' })

export const metadata: Metadata = {
  metadataBase: new URL('https://matnemati.ir'),
  title: {
    default: 'Matin Nemati | Neuroscience & Neurotech',
    template: '%s · Matin Nemati',
  },
  description: 'Matin Nemati — undergraduate EE (Bioelectrics) focused on neuroscience, systems neuroscience, and neurotechnology.',
  alternates: {
    languages: {
      'en-US': '/en',
      'fa-IR': '/fa',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://matnemati.ir',
    title: 'Matin Nemati | Neuroscience & Neurotech',
    description: 'Portfolio & profile of Matin Nemati.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${vazir.variable} antialiased`}>
        {children}
        {/* JSON-LD Person schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Matin Nemati",
              url: "https://matnemati.ir",
              sameAs: [
                "https://github.com/MatNemati",
                "https://www.linkedin.com/in/MatNemati",
                "https://x.com/MatNemati",
                "https://t.me/MatNemati"
              ],
              jobTitle: "Undergraduate Electrical Engineering (Bioelectrics)",
              affiliation: {
                "@type": "CollegeOrUniversity",
                name: "Isfahan University of Technology"
              }
            })
          }}
        />
      </body>
    </html>
  )
}
