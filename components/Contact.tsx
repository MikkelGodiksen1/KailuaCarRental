"use client";

import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // Simulate async submission — wire up to your API / Resend / Formspree etc.
    await new Promise((res) => setTimeout(res, 800));
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <section id="contact" className="py-28 px-6 border-t border-white/[0.06]">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-xs uppercase tracking-widest text-zinc-500 mb-3">Contact</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
          Let&apos;s build something.
        </h2>
        <p className="text-zinc-400 mb-12 text-lg">
          Tell us what you&apos;re working on. We&apos;ll get back within 24 hours.
        </p>

        {submitted ? (
          <div className="rounded-2xl border border-violet-500/30 bg-violet-500/10 p-10">
            <div className="text-4xl mb-4">✦</div>
            <p className="text-white font-semibold text-lg">Message received.</p>
            <p className="text-zinc-400 text-sm mt-2">We&apos;ll be in touch soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-xs text-zinc-500 mb-1.5">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-md bg-white/[0.05] border border-white/[0.08] text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs text-zinc-500 mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 rounded-md bg-white/[0.05] border border-white/[0.08] text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-xs text-zinc-500 mb-1.5">
                What do you need?
              </label>
              <select
                id="subject"
                name="subject"
                defaultValue=""
                className="w-full px-4 py-3 rounded-md bg-white/[0.05] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition appearance-none"
              >
                <option value="" disabled className="bg-zinc-900">
                  Select a service
                </option>
                <option value="website" className="bg-zinc-900">Website</option>
                <option value="automation" className="bg-zinc-900">Automation</option>
                <option value="both" className="bg-zinc-900">Both</option>
                <option value="other" className="bg-zinc-900">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-xs text-zinc-500 mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Tell us about your project..."
                className="w-full px-4 py-3 rounded-md bg-white/[0.05] border border-white/[0.08] text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-md bg-white text-black font-semibold text-sm hover:bg-zinc-100 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send message"}
            </button>
          </form>
        )}

        <p className="mt-8 text-sm text-zinc-600">
          Or reach us directly at{" "}
          <a
            href="mailto:hello@godik.ai"
            className="text-zinc-400 hover:text-white transition-colors underline underline-offset-4"
          >
            hello@godik.ai
          </a>
        </p>
      </div>
    </section>
  );
}
