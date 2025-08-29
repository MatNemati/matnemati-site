
const content = {
  site: {
    name: "متین نعمتی",
    handle: "MatNemati",
    tagline: "علوم اعصاب · نوروتکنولوژی · بیوالکتریک",
    email: "MatNemati@gmail.com",
  },
  about: `متین نعمتی هستم؛ دانشجوی کارشناسی مهندسی برق (گرایش بیوالکتریک) در دانشگاه صنعتی اصفهان. در اغلب پلتفرم‌ها با آیدی MatNemati پیدا می‌شوم.
تمرکز من روی علوم اعصاب، نوروتکنولوژی و سامانه‌های عصبی است و از حل مسائل عمیق که نیازمند نگاه الگوریتمی و خلاقانه‌اند لذت می‌برم. به فیزیک و سیگنال‌پردازی نیز علاقه‌مندم و این روزها در حال کاوش پیوندهای احتمالی میان کارکرد مغز و پدیده‌های کوانتومی‌ام.
(تابستان ۲۰۲۵)`,
  experience: [
    { role: "مدرس فیزیک (خصوصی و آموزشگاهی)", org: "", where: "", when: "۱۳۹۹ – ۱۴۰۳", bullets: ["تدریس فیزیک دبیرستان و کنکور."] },
    { role: "مشاور تحصیلی", org: "مرکز مشاوره هیوا (تهران)", where: "تهران", when: "۱۴۰۰ – اردیبهشت ۱۴۰۱", bullets: ["راهنمایی در حوزه‌های کنکور، کارشناسی ارشد و مهاجرت تحصیلی."] },
    { role: "عضو قراردادی تیم انتخاب رشته", org: "تیم دکتر یعقوبی", where: "", when: "تابستان ۱۴۰۲", bullets: ["همکاری در فرایند انتخاب رشتهٔ داوطلبان."] },
    { role: "سرپرست تیم مشاور تحصیلی", org: "", where: "", when: "تابستان ۱۴۰۲ – ابتدای ۱۴۰۳", bullets: ["هدایت تیم مشاوران و نظارت بر برنامه‌ریزی و اجرا."] },
    { role: "دستیار آموزشی (TA) – برنامه‌نویسی پایتون", org: "دانشگاه صنعتی اصفهان", where: "", when: "۱۴۰۱ – ۱۴۰۲", bullets: ["همکاری در تدریس و پشتیبانی دانشجویان (زیر نظر دکتر خسروی‌فرد)."] },
  ],
  skills: {
    programming: ["Python", "MATLAB", "LaTeX"],
    signal: ["مبانی DSP", "آشنایی با سیگنال‌های حیاتی (ECG/EEG/EMG)", "تجربه پردازش EEG/EMG"],
    embedded: ["STM32 (STM32CubeMX + HAL) — نیاز به یادآوری"],
    simulation: ["PSpice/OrCAD", "Proteus"]
  },
  projects: [
    { title: "طبقه‌بندی سیگنال EMG برای حرکات بازو و مچ", date: "دی ۱۴۰۳", desc: "پروژهٔ دانشگاهی آز سیگنال حیاتی؛ پیاده‌سازی و ارزیابی روش‌های طبقه‌بندی EMG.", tags: ["EMG","Signal Processing","Classification"], link: "https://github.com/MatNemati/EMG-Signal-Classification" },
    { title: "مقالهٔ مروری: پدیده‌های کوانتومی در مغز (در حال انجام)", date: "در حال نگارش", desc: "مرور دیدگاه‌ها و شواهد دربارهٔ نقش پدیده‌های کوانتومی در کارکرد مغز.", tags: ["Neuroscience","Quantum","Review"], link: "" },
  ],
  education: [
    { program: "کارشناسی مهندسی برق (بیوالکتریک/مهندسی پزشکی)", org: "دانشگاه صنعتی اصفهان", when: "شروع از ۱۴۰۱" }
  ],
  awards: [
    { title: "برگزیدهٔ دورهٔ علوم اعصاب شناختی (IPM)", when: "تابستان ۲۰۲۴", desc: "دورهٔ شش‌ماهه مبتنی بر کتاب کندل؛ دریافت گواهی برگزیده دوره." }
  ],
  contact: [
    { label: "ایمیل", href: "mailto:MatNemati@gmail.com" },
    { label: "GitHub", href: "https://github.com/MatNemati" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/MatNemati" },
    { label: "X", href: "https://x.com/MatNemati" },
    { label: "Telegram", href: "https://t.me/MatNemati" }
  ],
  placeholders: {
    grades: "به‌زودی…",
    courses: "به‌زودی…"
  }
}

export default content
