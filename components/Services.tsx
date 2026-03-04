const services = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
    title: "Websites",
    description:
      "Fast, beautiful, conversion-focused websites built with modern tech. From landing pages to full product sites — we ship fast and build to last.",
    points: [
      "Next.js + Tailwind",
      "Mobile-first & accessible",
      "SEO-optimized",
      "Vercel / edge deployment",
    ],
    gradient: "from-violet-500/10 to-indigo-500/5",
    border: "hover:border-violet-500/30",
    iconColor: "text-violet-400",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Automations",
    description:
      "Cut manual work and scale without headcount. We connect your tools, automate your workflows, and build AI agents that actually do the job.",
    points: [
      "AI-powered workflows",
      "CRM & tool integrations",
      "Data pipelines",
      "Custom bots & agents",
    ],
    gradient: "from-cyan-500/10 to-indigo-500/5",
    border: "hover:border-cyan-500/30",
    iconColor: "text-cyan-400",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <p className="text-xs uppercase tracking-widest text-zinc-500 mb-3">Services</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Two things. Done right.
          </h2>
          <p className="mt-4 text-zinc-400 max-w-lg text-lg">
            We stay focused so we can go deep. You get quality, not bloat.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className={`group relative rounded-2xl border border-white/[0.08] bg-gradient-to-br ${s.gradient} p-8 transition-all duration-300 ${s.border} hover:bg-white/[0.02]`}
            >
              <div className={`mb-6 ${s.iconColor}`}>{s.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">{s.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">{s.description}</p>
              <ul className="space-y-2">
                {s.points.map((point) => (
                  <li key={point} className="flex items-center gap-2 text-sm text-zinc-400">
                    <span className={`text-xs ${s.iconColor}`}>✦</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
