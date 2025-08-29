
import { ReactNode } from 'react'

export default function Section({ id, title, children, lang }:{ id:string, title:string, children: ReactNode, lang:'fa'|'en'}) {
  return (
    <section id={id} className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <span className="text-sm text-muted">{lang === 'fa' ? 'بخش' : 'Section'}</span>
      </div>
      {children}
    </section>
  )
}
