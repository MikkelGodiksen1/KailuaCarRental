const stats = [
  { value: "10+", label: "Projects shipped" },
  { value: "48h", label: "Avg. first delivery" },
  { value: "100%", label: "Remote & async" },
];

export default function About() {
  return (
    <section id="about" className="py-28 px-6 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <p className="text-xs uppercase tracking-widest text-zinc-500 mb-3">About</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-6">
              We move fast.
              <br />
              We don&apos;t cut corners.
            </h2>
            <div className="space-y-4 text-zinc-400 text-base leading-relaxed">
              <p>
                Godik.ai is a small, sharp team building digital products for
                companies that want to look great and operate smarter.
              </p>
              <p>
                No agencies. No bloat. Just focused execution — from first brief
                to live site, from idea to running automation.
              </p>
              <p>
                We care about the details that most people skip: performance,
                typography, interaction design, and code that won&apos;t fall apart
                six months later.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-6 p-6 rounded-xl border border-white/[0.08] bg-white/[0.02]"
              >
                <span className="text-3xl font-bold text-white tracking-tight">{stat.value}</span>
                <span className="text-zinc-400 text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
