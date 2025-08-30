
import Header from '@/components/Header'
import Brain from '@/components/Brain'
import Section from '@/components/Section'
import SmoothScroll from '@/components/SmoothScroll'
import content from '@/content/fa'
import Background3D from '@/components/Background3D'


export const dynamic = 'force-static'

export default function Page() {
  const c = content
  return (
    <main className="rtl">
      <Background3D />
      <SmoothScroll />
      <Header lang="fa" />
      <Brain />

      {/* HERO */}
      <section id="home" className="container pt-10 space-y-6 md:pr-[480px]">
        <div className="card">
          <h1 className="text-3xl font-bold">متین نعمتی</h1>
          
          <div className="flex justify-center my-3">
            <img
              src="/images/avatar.jpg"
              alt="Matin Nemati portrait"
              className="w-40 h-40 rounded-2xl object-cover border border-line shadow-soft"
            />
          </div>

          <p className="text-muted">{c.site.tagline}</p>
          <p className="mt-3 whitespace-pre-wrap">{c.about}</p>
        </div>
      </section>

      <div className="container my-6 grid gap-6">
        <Section id="experience" title="سوابق" lang="fa">
          <ul className="space-y-4">
            {c.experience.map((x, i) => (
              <li key={i} className="border border-line rounded-2xl p-4 bg-card">
                <div className="font-semibold">{x.role}{x.org ? ' · ' + x.org : ''}</div>
                <div className="text-sm text-muted">{x.when}{x.where ? ' — ' + x.where : ''}</div>
                {x.bullets?.length ? <ul className="list-disc mr-5 mt-2 space-y-1">{x.bullets.map((b,j)=><li key={j}>{b}</li>)}</ul> : null}
              </li>
            ))}
          </ul>
        </Section>

        <Section id="projects" title="پروژه‌ها" lang="fa">
          <div className="grid md:grid-cols-2 gap-4">
            {c.projects.map((p,i)=>(
              <div key={i} className="p-4 rounded-2xl border border-line bg-card">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{p.title}</h3>
                  <span className="text-xs text-muted">{p.date}</span>
                </div>
                <p className="mt-1 text-sm text-muted">{p.desc}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.tags?.map((t:any, k:number)=>(<span key={k} className="text-xs px-2 py-1 rounded-full border border-line">{t}</span>))}
                </div>
                {p.link ? <a className="inline-block mt-3 text-sm px-3 py-2 rounded-xl border border-line bg-card hover:bg-card/70" href={p.link} target="_blank" rel="noopener">مشاهده</a> : null}
              </div>
            ))}
          </div>
        </Section>

        <Section id="skills" title="مهارت‌ها" lang="fa">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl border border-line bg-card"><div className="font-medium">برنامه‌نویسی</div><div className="text-sm text-muted">{c.skills.programming.join('، ')}</div></div>
            <div className="p-4 rounded-2xl border border-line bg-card"><div className="font-medium">سیگنال‌پردازی</div><div className="text-sm text-muted">{c.skills.signal.join('، ')}</div></div>
            <div className="p-4 rounded-2xl border border-line bg-card"><div className="font-medium">امبدد/میکروکنترلر</div><div className="text-sm text-muted">{c.skills.embedded.join('، ')}</div></div>
            <div className="p-4 rounded-2xl border border-line bg-card"><div className="font-medium">شبیه‌سازی</div><div className="text-sm text-muted">{c.skills.simulation.join('، ')}</div></div>
          </div>
        </Section>

        <Section id="education" title="تحصیلات" lang="fa">
          <ul className="space-y-2">
            {c.education.map((e,i)=>(
              <li key={i} className="border border-line rounded-2xl p-4 bg-card">
                <div className="font-semibold">{e.program}</div>
                <div className="text-sm text-muted">{e.org} · {e.when}</div>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="awards" title="دستاورد" lang="fa">
          <ul className="space-y-2">
            {c.awards.map((a,i)=>(
              <li key={i} className="border border-line rounded-2xl p-4 bg-card">
                <div className="font-semibold">{a.title}</div>
                <div className="text-sm text-muted">{a.when}</div>
                <p className="text-sm mt-1">{a.desc}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="contact" title="تماس" lang="fa">
          <div className="flex flex-wrap gap-2">
            {c.contact.map((x,i)=>(<a key={i} className="px-3 py-2 rounded-xl border border-line bg-card hover:bg-card/70" href={x.href} target="_blank" rel="noopener">{x.label}</a>))}
          </div>
        </Section>

        <Section id="grades" title="نمرات" lang="fa">
          <div className="p-4 rounded-2xl border border-dashed border-line text-muted">{c.placeholders.grades}</div>
        </Section>

        <Section id="courses" title="دروس" lang="fa">
          <div className="p-4 rounded-2xl border border-dashed border-line text-muted">{c.placeholders.courses}</div>
        </Section>

        <footer className="text-center text-sm text-muted py-8">© {new Date().getFullYear()} متین نعمتی</footer>
      </div>
    </main>
  )
}
