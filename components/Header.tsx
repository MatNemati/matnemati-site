
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

export default function Header({ lang }: { lang: 'fa' | 'en' }) {
  const pathname = usePathname() || `/${lang}`

  const otherLangHref = useMemo(() => {
    if (pathname.startsWith('/fa')) return pathname.replace('/fa', '/en')
    if (pathname.startsWith('/en')) return pathname.replace('/en', '/fa')
    return lang === 'fa' ? '/en' : '/fa'
  }, [pathname, lang])

  const nav = [
    { id: 'home', fa: 'خانه', en: 'Home' },
    { id: 'about', fa: 'درباره', en: 'About' },
    { id: 'experience', fa: 'سوابق', en: 'Experience' },
    { id: 'projects', fa: 'پروژه‌ها', en: 'Projects' },
    { id: 'skills', fa: 'مهارت‌ها', en: 'Skills' },
    { id: 'education', fa: 'تحصیلات', en: 'Education' },
    { id: 'awards', fa: 'دستاورد', en: 'Awards' },
    { id: 'contact', fa: 'تماس', en: 'Contact' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-bg/70 backdrop-blur">
      <div className="container flex items-center justify-between gap-4 py-3">
        <Link href={`/${lang}#home`} className="font-bold">
          <span className="inline-block w-2 h-2 rounded-full bg-acc mr-2 align-middle" />
          Matin&nbsp;Nemati
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          {nav.map(item => (
            <a key={item.id} href={`#${item.id}`} className="px-3 py-2 rounded-xl hover:bg-card/60 border border-transparent hover:border-line">
              {lang === 'fa' ? item.fa : item.en}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={otherLangHref} className="px-3 py-2 rounded-xl border border-line bg-card hover:bg-card/80">
            {lang === 'fa' ? 'EN' : 'فا'}
          </a>

        </div>
      </div>
    </header>
  )
}
