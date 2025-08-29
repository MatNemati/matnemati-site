
import './globals.css'
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Vazirmatn } from 'next/font/google'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plusjakarta',
  weight: ['300','400','500','600','700'],
})
const vazir = Vazirmatn({
  subsets: ['arabic'],
  variable: '--font-vazir',
  weight: ['300','400','500','600','700'],
})

...
<body className={`${plusJakarta.variable} ${vazir.variable} antialiased`}>


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
