"use client";

import { useEffect, useRef, useState } from "react";

/* ──────────────────────────────────────────────────────
   MIKKEL CHARACTER  (SVG cartoon: beanie · beard · puffer)
   ────────────────────────────────────────────────────── */
function MikkelCharacter({ walking }: { walking: boolean }) {
  return (
    <div className={walking ? "is-walking" : ""} style={{ width: 80, height: 130, filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.6))" }}>
      <svg viewBox="0 0 80 130" xmlns="http://www.w3.org/2000/svg" overflow="visible">

        {/* Shadow */}
        <ellipse cx="40" cy="128" rx="20" ry="4" fill="rgba(0,0,0,0.4)" />

        {/* ── LEFT LEG ── */}
        <g className="char-leg-left">
          <rect x="20" y="90" width="15" height="36" rx="6" fill="#1a1f38" />
          <ellipse cx="24" cy="126" rx="11" ry="5" fill="#0e1020" />
        </g>

        {/* ── RIGHT LEG ── */}
        <g className="char-leg-right">
          <rect x="45" y="90" width="15" height="36" rx="6" fill="#1a1f38" />
          <ellipse cx="56" cy="126" rx="11" ry="5" fill="#0e1020" />
        </g>

        {/* ── BODY GROUP (bobs when walking) ── */}
        <g className="char-body">

          {/* Puffer jacket body */}
          <path d="M18,60 Q13,62 13,74 L13,90 Q13,96 20,96 L60,96 Q67,96 67,90 L67,74 Q67,62 62,60 Z" fill="#1b3a5c" />
          {/* Quilting horizontal lines */}
          <path d="M14,72 Q40,70 66,72" stroke="#224a73" strokeWidth="1.5" fill="none" />
          <path d="M14,83 Q40,81 66,83" stroke="#224a73" strokeWidth="1.5" fill="none" />
          {/* Center zip */}
          <line x1="40" y1="62" x2="40" y2="95" stroke="#152d47" strokeWidth="1.5" />
          {/* Collar / hoodie visible */}
          <path d="M26,60 Q40,72 54,60" fill="#2a5285" />

          {/* ── LEFT ARM ── */}
          <g className="char-arm-left">
            <path d="M8,63 Q5,66 5,80 Q5,91 13,93 L18,91 L20,68 L15,61 Z" fill="#1b3a5c" />
            <path d="M6,74 Q13,73 19,75" stroke="#224a73" strokeWidth="1.2" fill="none" />
            <path d="M6,84 Q13,83 19,85" stroke="#224a73" strokeWidth="1.2" fill="none" />
            <circle cx="12" cy="94" r="6" fill="#f3c49e" />
          </g>

          {/* ── RIGHT ARM ── */}
          <g className="char-arm-right">
            <path d="M72,63 Q75,66 75,80 Q75,91 67,93 L62,91 L60,68 L65,61 Z" fill="#1b3a5c" />
            <path d="M74,74 Q67,73 61,75" stroke="#224a73" strokeWidth="1.2" fill="none" />
            <path d="M74,84 Q67,83 61,85" stroke="#224a73" strokeWidth="1.2" fill="none" />
            <circle cx="68" cy="94" r="6" fill="#f3c49e" />
          </g>

          {/* ── NECK ── */}
          <rect x="34" y="48" width="12" height="16" rx="5" fill="#f3c49e" />

          {/* ── HEAD ── */}
          <circle cx="40" cy="34" r="24" fill="#f3c49e" />

          {/* Beard base (sandy) */}
          <path d="M20,38 Q20,54 40,58 Q60,54 60,38" fill="#d4a760" />
          {/* Beard highlight */}
          <path d="M23,41 Q23,51 40,55 Q57,51 57,41" fill="#e0bc76" />

          {/* Eyes */}
          <circle cx="31" cy="30" r="4.5" fill="white" />
          <circle cx="49" cy="30" r="4.5" fill="white" />
          <circle cx="31" cy="31" r="2.4" fill="#3868c8" />
          <circle cx="49" cy="31" r="2.4" fill="#3868c8" />
          <circle cx="31" cy="31" r="1.2" fill="#0a0e1a" />
          <circle cx="49" cy="31" r="1.2" fill="#0a0e1a" />
          <circle cx="32" cy="30" r="0.8" fill="white" />
          <circle cx="50" cy="30" r="0.8" fill="white" />

          {/* Eyebrows */}
          <path d="M25,23 Q31,20 37,23" stroke="#9a7830" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <path d="M43,23 Q49,20 55,23" stroke="#9a7830" strokeWidth="1.6" fill="none" strokeLinecap="round" />

          {/* Nose */}
          <path d="M37,37 Q40,42 43,37" stroke="#d08a5a" strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* Smile */}
          <path d="M33,47 Q40,53 47,47" stroke="#b86840" strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* ── BEANIE HAT ── */}
          {/* Brim / rolled cuff */}
          <rect x="17" y="17" width="46" height="14" rx="5" fill="#b08828" />
          {/* Main hat body */}
          <ellipse cx="40" cy="14" rx="23" ry="16" fill="#c9a040" />
          {/* Top dome */}
          <ellipse cx="40" cy="6"  rx="15" ry="10" fill="#be9632" />
          {/* Pom */}
          <circle cx="40" cy="-1" r="6" fill="#a8821e" />
          {/* Hat texture lines */}
          <path d="M20,12 Q40,8 60,12"  stroke="#9a7418" strokeWidth="0.9" fill="none" opacity="0.6" />
          <path d="M19,18 Q40,14 61,18" stroke="#9a7418" strokeWidth="0.9" fill="none" opacity="0.5" />

        </g>{/* end char-body */}
      </svg>
    </div>
  );
}

/* ──────────────────────────────────────────────────────
   SCENE 1 — INTRO  (deep space · stars)
   ────────────────────────────────────────────────────── */
function SceneIntro() {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    x: (i * 137.5) % 100,
    y: (i * 97.3) % 75,
    r: ((i % 3) + 1) * 0.6,
    delay: (i % 5) * 0.4,
    dur: 2 + (i % 4) * 0.8,
  }));

  return (
    <div
      className="relative flex-shrink-0 overflow-hidden"
      style={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(170deg, #060616 0%, #0d0d30 55%, #12082e 100%)",
      }}
    >
      {/* Stars */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {stars.map((s, i) => (
          <circle
            key={i}
            cx={`${s.x}%`}
            cy={`${s.y}%`}
            r={s.r}
            fill="white"
            style={{
              animation: `twinkle ${s.dur}s ${s.delay}s ease-in-out infinite`,
            }}
          />
        ))}
        {/* Big nebula glow */}
        <ellipse cx="75%" cy="35%" rx="200" ry="140" fill="rgba(100,60,220,0.07)" />
        <ellipse cx="20%" cy="50%" rx="150" ry="100" fill="rgba(60,80,220,0.06)" />
      </svg>

      {/* Floating laptop illustration */}
      <div
        className="absolute"
        style={{
          right: "8%",
          top: "20%",
          animation: "floatSlow 4s ease-in-out infinite",
        }}
      >
        <svg width="160" height="110" viewBox="0 0 160 110" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Screen body */}
          <rect x="20" y="0" width="120" height="80" rx="8" fill="#1a1f38" stroke="#2a3060" strokeWidth="1.5" />
          {/* Screen bezel */}
          <rect x="26" y="6" width="108" height="64" rx="5" fill="#0d1026" />
          {/* Code lines on screen */}
          <rect x="32" y="14" width="45" height="3" rx="1.5" fill="#7c6aec" opacity="0.8" />
          <rect x="32" y="21" width="70" height="3" rx="1.5" fill="#4a9eff" opacity="0.6" />
          <rect x="32" y="28" width="55" height="3" rx="1.5" fill="#4a9eff" opacity="0.5" />
          <rect x="38" y="35" width="40" height="3" rx="1.5" fill="#3ecfcf" opacity="0.7" />
          <rect x="38" y="42" width="60" height="3" rx="1.5" fill="#7c6aec" opacity="0.5" />
          <rect x="32" y="49" width="35" height="3" rx="1.5" fill="#4a9eff" opacity="0.4" />
          <rect x="38" y="56" width="50" height="3" rx="1.5" fill="#3ecfcf" opacity="0.5" />
          {/* Cursor blink */}
          <rect x="92" y="56" width="2" height="10" rx="1" fill="#7c6aec" opacity="0.9" style={{ animation: "twinkle 1s ease-in-out infinite" }} />
          {/* Base */}
          <path d="M5 83 L155 83 L148 95 L12 95 Z" fill="#1a1f38" stroke="#2a3060" strokeWidth="1.5" />
          <rect x="55" y="80" width="50" height="5" rx="2" fill="#2a3060" />
        </svg>
      </div>

      {/* Small floating orbs */}
      <div className="absolute" style={{ left: "15%", top: "30%", animation: "floatMed 3.2s 0.5s ease-in-out infinite" }}>
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "rgba(124,106,236,0.6)", boxShadow: "0 0 20px rgba(124,106,236,0.4)" }} />
      </div>
      <div className="absolute" style={{ right: "25%", top: "60%", animation: "floatMed 2.8s 1s ease-in-out infinite" }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(74,158,255,0.5)", boxShadow: "0 0 14px rgba(74,158,255,0.4)" }} />
      </div>

      {/* Content */}
      <div
        className="absolute z-10 flex flex-col"
        style={{ left: "6%", top: "18%", maxWidth: 480 }}
      >
        {/* Available badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 14px",
            borderRadius: 999,
            border: "1px solid rgba(124,106,236,0.3)",
            background: "rgba(124,106,236,0.08)",
            marginBottom: 24,
            width: "fit-content",
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#7c6aec", animation: "pulseGlow 2s ease-in-out infinite", display: "inline-block" }} />
          <span style={{ fontSize: 12, color: "#a090e8", letterSpacing: "0.05em" }}>Available for new projects</span>
        </div>

        <h1 style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", fontWeight: 800, lineHeight: 1.1, color: "white", marginBottom: 20 }}>
          Hey, I&apos;m{" "}
          <span style={{ background: "linear-gradient(135deg, #a78bfa, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Mikkel.
          </span>
        </h1>

        <p style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)", color: "#9090b8", lineHeight: 1.7, marginBottom: 32 }}>
          I build <strong style={{ color: "#c4b5fd" }}>websites</strong> and{" "}
          <strong style={{ color: "#93c5fd" }}>automations</strong> for ambitious
          businesses — fast, sharp, and built to last.
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#6060a0", fontSize: 13 }}>
          <span>Scroll to explore</span>
          <span style={{ fontSize: 18 }}>→</span>
        </div>
      </div>

      {/* Ground */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "14vh",
          background: "linear-gradient(to top, #06060f 0%, #0a0a1e 60%, transparent 100%)",
        }}
      />
      {/* Ground surface line */}
      <div
        className="absolute left-0 right-0"
        style={{
          bottom: "14vh",
          height: 2,
          background: "linear-gradient(90deg, transparent, rgba(90,60,200,0.3), rgba(60,100,200,0.3), transparent)",
        }}
      />
    </div>
  );
}

/* ──────────────────────────────────────────────────────
   SCENE 2 — WEBSITES  (city night · browsers)
   ────────────────────────────────────────────────────── */
function SceneWebsites() {
  return (
    <div
      className="relative flex-shrink-0 overflow-hidden"
      style={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(170deg, #040810 0%, #070d22 50%, #090d20 100%)",
      }}
    >
      {/* City silhouette */}
      <svg
        className="absolute bottom-0 left-0 right-0"
        style={{ width: "100%", height: "40vh" }}
        viewBox="0 0 1440 300"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Far buildings */}
        <rect x="0"    y="160" width="60"  height="140" fill="#0a0e1c" />
        <rect x="20"   y="130" width="30"  height="170" fill="#0a0e1c" />
        <rect x="70"   y="180" width="50"  height="120" fill="#0a0e1c" />
        <rect x="130"  y="120" width="45"  height="180" fill="#0c1022" />
        <rect x="145"  y="90"  width="20"  height="210" fill="#0c1022" />
        <rect x="190"  y="155" width="70"  height="145" fill="#0a0e1c" />
        <rect x="270"  y="100" width="55"  height="200" fill="#0c1022" />
        <rect x="290"  y="80"  width="18"  height="220" fill="#0c1022" />
        <rect x="340"  y="140" width="80"  height="160" fill="#0a0e1c" />
        <rect x="430"  y="110" width="40"  height="190" fill="#0c1022" />
        <rect x="480"  y="160" width="90"  height="140" fill="#0a0e1c" />
        <rect x="580"  y="90"  width="60"  height="210" fill="#0c1022" />
        <rect x="600"  y="60"  width="22"  height="240" fill="#0c1022" />
        <rect x="650"  y="150" width="70"  height="150" fill="#0a0e1c" />
        <rect x="730"  y="110" width="50"  height="190" fill="#0c1022" />
        <rect x="790"  y="170" width="80"  height="130" fill="#0a0e1c" />
        <rect x="880"  y="100" width="45"  height="200" fill="#0c1022" />
        <rect x="895"  y="70"  width="18"  height="230" fill="#0c1022" />
        <rect x="940"  y="140" width="70"  height="160" fill="#0a0e1c" />
        <rect x="1020" y="115" width="55"  height="185" fill="#0c1022" />
        <rect x="1085" y="155" width="90"  height="145" fill="#0a0e1c" />
        <rect x="1185" y="100" width="50"  height="200" fill="#0c1022" />
        <rect x="1200" y="70"  width="20"  height="230" fill="#0c1022" />
        <rect x="1250" y="145" width="65"  height="155" fill="#0a0e1c" />
        <rect x="1330" y="120" width="55"  height="180" fill="#0c1022" />
        <rect x="1390" y="160" width="50"  height="140" fill="#0a0e1c" />
        {/* Window lights */}
        {[
          [30,140],[85,160],[140,100],[155,110],[205,160],[280,110],[350,150],
          [440,120],[500,170],[595,100],[660,160],[740,120],[800,180],[890,110],
          [950,150],[1030,125],[1095,165],[1195,110],[1260,155],[1345,130],
        ].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="4" height="4" fill={i % 3 === 0 ? "#4a9eff" : i % 3 === 1 ? "#7c6aec" : "#ffcc44"} opacity="0.7" style={{ animation: `twinkle ${2 + (i % 4) * 0.5}s ${(i % 5) * 0.3}s ease-in-out infinite` }} />
        ))}
        {/* Ground fill */}
        <rect x="0" y="270" width="1440" height="30" fill="#06060f" />
      </svg>

      {/* Floating browser window 1 */}
      <div
        className="absolute"
        style={{ right: "6%", top: "12%", animation: "floatSlow 4.5s ease-in-out infinite" }}
      >
        <svg width="220" height="150" viewBox="0 0 220 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="220" height="150" rx="10" fill="#0d1226" stroke="#1e2a50" strokeWidth="1.5" />
          {/* Browser chrome */}
          <rect width="220" height="28" rx="10" fill="#121830" />
          <rect x="0" y="18" width="220" height="10" fill="#121830" />
          {/* Traffic lights */}
          <circle cx="14" cy="14" r="4" fill="#ff5f57" />
          <circle cx="26" cy="14" r="4" fill="#ffbd2e" />
          <circle cx="38" cy="14" r="4" fill="#28c840" />
          {/* URL bar */}
          <rect x="50" y="8" width="120" height="12" rx="4" fill="#1a2040" />
          <rect x="56" y="12" width="40" height="4" rx="2" fill="#3a9fff" opacity="0.7" />
          {/* Content */}
          <rect x="12" y="38" width="90" height="8"  rx="3" fill="#7c6aec" opacity="0.8" />
          <rect x="12" y="52" width="130" height="5" rx="2" fill="#4060a0" opacity="0.6" />
          <rect x="12" y="62" width="110" height="5" rx="2" fill="#4060a0" opacity="0.5" />
          <rect x="12" y="80" width="55" height="22" rx="6" fill="#7c6aec" opacity="0.7" />
          <rect x="80" y="83" width="35" height="16" rx="5" fill="transparent" stroke="#7c6aec" strokeWidth="1" />
          {/* Decorative image area */}
          <rect x="130" y="38" width="78" height="96" rx="6" fill="#0a0e20" stroke="#1e2a50" strokeWidth="1" />
          <circle cx="169" cy="70" r="20" fill="#1a2040" />
          <circle cx="169" cy="70" r="12" fill="#2a3060" />
        </svg>
      </div>

      {/* Floating browser window 2 (smaller) */}
      <div
        className="absolute"
        style={{ right: "28%", top: "55%", animation: "floatMed 3.2s 1.2s ease-in-out infinite" }}
      >
        <svg width="140" height="90" viewBox="0 0 140 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="140" height="90" rx="8" fill="#0d1226" stroke="#1e2a50" strokeWidth="1.2" />
          <rect width="140" height="20" rx="8" fill="#121830" />
          <rect x="0" y="12" width="140" height="8" fill="#121830" />
          <circle cx="10" cy="10" r="3" fill="#ff5f57" />
          <circle cx="19" cy="10" r="3" fill="#ffbd2e" />
          <circle cx="28" cy="10" r="3" fill="#28c840" />
          <rect x="36" y="5" width="70" height="10" rx="3" fill="#1a2040" />
          <rect x="8" y="28" width="60" height="6" rx="2" fill="#3ecfcf" opacity="0.7" />
          <rect x="8" y="38" width="90" height="4" rx="2" fill="#4060a0" opacity="0.5" />
          <rect x="8" y="46" width="70" height="4" rx="2" fill="#4060a0" opacity="0.4" />
          <rect x="8" y="60" width="40" height="16" rx="5" fill="#3ecfcf" opacity="0.6" />
        </svg>
      </div>

      {/* Content */}
      <div
        className="absolute z-10 flex flex-col"
        style={{ left: "6%", top: "16%", maxWidth: 460 }}
      >
        <p style={{ fontSize: 11, letterSpacing: "0.18em", color: "#4a9eff", marginBottom: 14, fontWeight: 600, textTransform: "uppercase" }}>
          // 01 — Websites
        </p>
        <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)", fontWeight: 800, lineHeight: 1.1, color: "white", marginBottom: 16 }}>
          Sharp{" "}
          <span style={{ background: "linear-gradient(135deg, #60a5fa, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            websites.
          </span>
        </h2>
        <p style={{ color: "#7080a8", fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)", lineHeight: 1.7, marginBottom: 28 }}>
          Fast, beautiful, conversion-focused sites built
          with modern tech. Shipped in weeks, not months.
        </p>
        <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
          {["Next.js + Tailwind", "Mobile-first & accessible", "SEO-optimized", "Deployed on Vercel"].map((p) => (
            <li key={p} style={{ display: "flex", alignItems: "center", gap: 10, color: "#8090b8", fontSize: 14 }}>
              <span style={{ color: "#4a9eff", fontSize: 16 }}>✦</span>
              {p}
            </li>
          ))}
        </ul>
      </div>

      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0" style={{ height: "14vh", background: "linear-gradient(to top, #06060f 0%, #0a0a1e 60%, transparent 100%)" }} />
      <div className="absolute left-0 right-0" style={{ bottom: "14vh", height: 2, background: "linear-gradient(90deg, transparent, rgba(60,100,200,0.35), rgba(60,200,200,0.2), transparent)" }} />
    </div>
  );
}

/* ──────────────────────────────────────────────────────
   SCENE 3 — AUTOMATIONS  (tech · circuits · AI nodes)
   ────────────────────────────────────────────────────── */
function SceneAutomations() {
  return (
    <div
      className="relative flex-shrink-0 overflow-hidden"
      style={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(170deg, #03080e 0%, #050d18 55%, #040c15 100%)",
      }}
    >
      {/* Circuit board background */}
      <svg className="absolute inset-0" style={{ width: "100%", height: "100%", opacity: 0.25 }} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        {/* Horizontal traces */}
        {[80,160,240,320,420,520,620,720].map((y, i) => (
          <line key={`h${i}`} x1="0" y1={y} x2="1440" y2={y} stroke="#1e8a8a" strokeWidth="0.8"
            strokeDasharray="20 40" style={{ animation: `dash ${3 + i * 0.4}s linear infinite` }} />
        ))}
        {/* Vertical traces */}
        {[120,240,380,520,660,800,960,1100,1280].map((x, i) => (
          <line key={`v${i}`} x1={x} y1="0" x2={x} y2="900" stroke="#1e8a8a" strokeWidth="0.8"
            strokeDasharray="20 60" style={{ animation: `dash ${4 + i * 0.3}s linear infinite` }} />
        ))}
        {/* Nodes at intersections */}
        {[[120,80],[240,160],[380,240],[520,80],[660,160],[800,320],[960,80],[1100,240],[1280,160],
          [120,420],[380,520],[660,420],[960,520],[1280,420]].map(([x, y], i) => (
          <circle key={`n${i}`} cx={x} cy={y} r="4" fill="none" stroke="#1e8a8a" strokeWidth="1.2"
            style={{ animation: `twinkle ${2 + (i % 4) * 0.6}s ${(i % 5) * 0.4}s ease-in-out infinite` }} />
        ))}
      </svg>

      {/* Floating gear 1 (large) */}
      <div className="absolute" style={{ right: "10%", top: "15%", animation: "spinSlow 12s linear infinite" }}>
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="30" stroke="#1e8a8a" strokeWidth="3" fill="none" />
          <circle cx="50" cy="50" r="14" stroke="#1e8a8a" strokeWidth="2.5" fill="#050d18" />
          {[0,45,90,135,180,225,270,315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 50 + 30 * Math.cos(rad);
            const y1 = 50 + 30 * Math.sin(rad);
            const x2 = 50 + 42 * Math.cos(rad);
            const y2 = 50 + 42 * Math.sin(rad);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1e8a8a" strokeWidth="6" strokeLinecap="round" />;
          })}
        </svg>
      </div>

      {/* Floating gear 2 (small, reverse) */}
      <div className="absolute" style={{ right: "18%", top: "38%", animation: "spinSlowRev 8s linear infinite" }}>
        <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="27" cy="27" r="15" stroke="#3ecfcf" strokeWidth="2.2" fill="none" />
          <circle cx="27" cy="27" r="7"  stroke="#3ecfcf" strokeWidth="2" fill="#050d18" />
          {[0,60,120,180,240,300].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 27 + 15 * Math.cos(rad);
            const y1 = 27 + 15 * Math.sin(rad);
            const x2 = 27 + 23 * Math.cos(rad);
            const y2 = 27 + 23 * Math.sin(rad);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#3ecfcf" strokeWidth="5" strokeLinecap="round" />;
          })}
        </svg>
      </div>

      {/* AI flow diagram */}
      <div
        className="absolute"
        style={{ right: "4%", top: "52%", animation: "floatMed 3.8s 0.8s ease-in-out infinite" }}
      >
        <svg width="200" height="120" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Nodes */}
          <circle cx="20"  cy="60" r="14" fill="#0a1a20" stroke="#1e8a8a" strokeWidth="1.5" />
          <circle cx="100" cy="30" r="14" fill="#0a1a20" stroke="#3ecfcf" strokeWidth="1.5" />
          <circle cx="100" cy="90" r="14" fill="#0a1a20" stroke="#3ecfcf" strokeWidth="1.5" />
          <circle cx="180" cy="60" r="14" fill="#0a1a20" stroke="#1e8a8a" strokeWidth="1.5" />
          {/* Arrows */}
          <line x1="34" y1="55" x2="86" y2="35" stroke="#1e8a8a" strokeWidth="1.2" strokeDasharray="4 4" />
          <line x1="34" y1="65" x2="86" y2="85" stroke="#1e8a8a" strokeWidth="1.2" strokeDasharray="4 4" />
          <line x1="114" y1="35" x2="166" y2="55" stroke="#3ecfcf" strokeWidth="1.2" strokeDasharray="4 4" />
          <line x1="114" y1="85" x2="166" y2="65" stroke="#3ecfcf" strokeWidth="1.2" strokeDasharray="4 4" />
          {/* Node icons */}
          <text x="14"  y="64" fontSize="10" fill="#1e8a8a">⚡</text>
          <text x="94"  y="34" fontSize="9"  fill="#3ecfcf">⚙</text>
          <text x="94"  y="94" fontSize="9"  fill="#3ecfcf">🤖</text>
          <text x="174" y="64" fontSize="10" fill="#1e8a8a">✓</text>
        </svg>
      </div>

      {/* Content */}
      <div
        className="absolute z-10 flex flex-col"
        style={{ left: "6%", top: "16%", maxWidth: 460 }}
      >
        <p style={{ fontSize: 11, letterSpacing: "0.18em", color: "#3ecfcf", marginBottom: 14, fontWeight: 600, textTransform: "uppercase" }}>
          // 02 — Automations
        </p>
        <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)", fontWeight: 800, lineHeight: 1.1, color: "white", marginBottom: 16 }}>
          Intelligent{" "}
          <span style={{ background: "linear-gradient(135deg, #22d3ee, #34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            automations.
          </span>
        </h2>
        <p style={{ color: "#608080", fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)", lineHeight: 1.7, marginBottom: 28 }}>
          Cut manual work and scale without adding headcount.
          AI agents and workflows that actually get the job done.
        </p>
        <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
          {["AI-powered workflows", "CRM & tool integrations", "Data pipelines", "Custom bots & agents"].map((p) => (
            <li key={p} style={{ display: "flex", alignItems: "center", gap: 10, color: "#608888", fontSize: 14 }}>
              <span style={{ color: "#3ecfcf", fontSize: 16 }}>✦</span>
              {p}
            </li>
          ))}
        </ul>
      </div>

      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0" style={{ height: "14vh", background: "linear-gradient(to top, #03080e 0%, #060c14 60%, transparent 100%)" }} />
      <div className="absolute left-0 right-0" style={{ bottom: "14vh", height: 2, background: "linear-gradient(90deg, transparent, rgba(30,138,138,0.4), rgba(62,207,207,0.3), transparent)" }} />
    </div>
  );
}

/* ──────────────────────────────────────────────────────
   SCENE 4 — CONTACT  (warm · minimal · CTA)
   ────────────────────────────────────────────────────── */
function SceneContact() {
  const stars = Array.from({ length: 40 }, (_, i) => ({
    x: (i * 97.5) % 100,
    y: (i * 63.7) % 70,
    r: ((i % 3) + 1) * 0.5,
    delay: (i % 5) * 0.5,
    dur: 2.5 + (i % 3) * 0.7,
  }));

  return (
    <div
      className="relative flex-shrink-0 overflow-hidden"
      style={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(160deg, #080814 0%, #10081e 55%, #180620 100%)",
      }}
    >
      {/* Subtle stars */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {stars.map((s, i) => (
          <circle key={i} cx={`${s.x}%`} cy={`${s.y}%`} r={s.r} fill="white"
            style={{ animation: `twinkle ${s.dur}s ${s.delay}s ease-in-out infinite` }} />
        ))}
        <ellipse cx="60%" cy="40%" rx="250" ry="150" fill="rgba(150,50,200,0.05)" />
      </svg>

      {/* Floating envelope */}
      <div
        className="absolute"
        style={{ right: "8%", top: "20%", animation: "floatSlow 5s ease-in-out infinite" }}
      >
        <svg width="140" height="100" viewBox="0 0 140 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="132" height="92" rx="10" fill="#130820" stroke="#3a1e50" strokeWidth="1.5" />
          <path d="M4,14 L70,58 L136,14" stroke="#5a2e80" strokeWidth="1.5" fill="none" />
          <path d="M4,96 L52,52" stroke="#3a1e50" strokeWidth="1" />
          <path d="M136,96 L88,52" stroke="#3a1e50" strokeWidth="1" />
          {/* Glow */}
          <circle cx="70" cy="50" r="18" fill="rgba(150,80,220,0.12)" />
          <path d="M58,44 L70,52 L82,44" stroke="#9050e0" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      {/* Decorative orbs */}
      <div className="absolute" style={{ left: "8%",  top: "65%", animation: "floatMed 3.5s 0.3s ease-in-out infinite" }}>
        <div style={{ width: 16, height: 16, borderRadius: "50%", background: "rgba(180,80,240,0.5)", boxShadow: "0 0 24px rgba(180,80,240,0.4)" }} />
      </div>
      <div className="absolute" style={{ left: "20%", top: "72%", animation: "floatMed 2.8s 0.9s ease-in-out infinite" }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(140,80,200,0.4)", boxShadow: "0 0 18px rgba(140,80,200,0.3)" }} />
      </div>

      {/* Content */}
      <div
        className="absolute z-10 flex flex-col"
        style={{ left: "6%", top: "16%", maxWidth: 520 }}
      >
        <p style={{ fontSize: 11, letterSpacing: "0.18em", color: "#b080e8", marginBottom: 14, fontWeight: 600, textTransform: "uppercase" }}>
          // 03 — Contact
        </p>
        <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)", fontWeight: 800, lineHeight: 1.1, color: "white", marginBottom: 16 }}>
          Let&apos;s build{" "}
          <span style={{ background: "linear-gradient(135deg, #c084fc, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            something.
          </span>
        </h2>
        <p style={{ color: "#806880", fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)", lineHeight: 1.7, marginBottom: 36 }}>
          Tell me what you&apos;re working on.
          I&apos;ll get back to you within 24 hours.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <a
            href="mailto:hello@godik.ai"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "14px 28px",
              borderRadius: 8,
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              color: "white",
              fontWeight: 700,
              fontSize: 15,
              textDecoration: "none",
              width: "fit-content",
              boxShadow: "0 0 32px rgba(124,58,237,0.35)",
            }}
          >
            <span>✉</span>
            hello@godik.ai
          </a>

          <p style={{ color: "#5a4868", fontSize: 13 }}>
            Or reach out on{" "}
            <span style={{ color: "#a080c8" }}>LinkedIn</span>
            {" "}— I respond to everyone.
          </p>
        </div>
      </div>

      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0" style={{ height: "14vh", background: "linear-gradient(to top, #080814 0%, #0e0818 60%, transparent 100%)" }} />
      <div className="absolute left-0 right-0" style={{ bottom: "14vh", height: 2, background: "linear-gradient(90deg, transparent, rgba(150,50,200,0.3), rgba(200,80,240,0.2), transparent)" }} />
    </div>
  );
}

/* ──────────────────────────────────────────────────────
   MAIN PAGE
   ────────────────────────────────────────────────────── */
export default function Home() {
  const worldRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [walking, setWalking] = useState(false);
  const walkTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const p = Math.min(scrollY / maxScroll, 1);

      setProgress(p);

      if (worldRef.current) {
        const tx = -p * 3 * window.innerWidth;
        worldRef.current.style.transform = `translateX(${tx}px)`;
      }

      setWalking(true);
      if (walkTimer.current) clearTimeout(walkTimer.current);
      walkTimer.current = setTimeout(() => setWalking(false), 250);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const currentScene = Math.round(progress * 3);

  const scenes = [
    { label: "Hello",       color: "#7c6aec" },
    { label: "Websites",    color: "#4a9eff" },
    { label: "Automations", color: "#3ecfcf" },
    { label: "Contact",     color: "#c084fc" },
  ];

  const goToScene = (i: number) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: (i / 3) * maxScroll, behavior: "smooth" });
  };

  return (
    <div style={{ height: "500vh" }}>
      {/* ── Top progress bar ── */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: 3,
          width: `${progress * 100}%`,
          background: `linear-gradient(90deg, ${scenes[0].color}, ${scenes[currentScene].color})`,
          zIndex: 100,
          transition: "width 0.08s linear",
        }}
      />

      {/* ── Scene nav dots (right side) ── */}
      <div
        style={{
          position: "fixed",
          right: 20,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 100,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          alignItems: "center",
        }}
      >
        {scenes.map((s, i) => (
          <button
            key={s.label}
            onClick={() => goToScene(i)}
            title={s.label}
            style={{
              width: currentScene === i ? 10 : 7,
              height: currentScene === i ? 10 : 7,
              borderRadius: "50%",
              background: currentScene === i ? s.color : "rgba(255,255,255,0.18)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: currentScene === i ? `0 0 10px ${s.color}80` : "none",
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* ── Sticky viewport ── */}
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>

        {/* Horizontal world */}
        <div
          ref={worldRef}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            width: "400vw",
            willChange: "transform",
          }}
        >
          <SceneIntro />
          <SceneWebsites />
          <SceneAutomations />
          <SceneContact />
        </div>

        {/* Character — fixed on screen */}
        <div
          style={{
            position: "absolute",
            bottom: "14vh",
            left: "46%",
            transform: "translateX(-50%)",
            zIndex: 30,
          }}
        >
          <MikkelCharacter walking={walking} />
        </div>

        {/* Scene label bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 24,
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: "0.12em" }}>
            {(currentScene + 1).toString().padStart(2, "0")} / 04
          </span>
          <span style={{ fontSize: 11, color: scenes[currentScene].color, letterSpacing: "0.08em" }}>
            {scenes[currentScene].label.toUpperCase()}
          </span>
        </div>

        {/* Scroll hint (only on scene 0) */}
        {progress < 0.05 && (
          <div
            style={{
              position: "absolute",
              bottom: 24,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 50,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              animation: "floatMed 1.8s ease-in-out infinite",
            }}
          >
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>SCROLL</span>
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="14" height="22" rx="7" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
              <rect x="6" y="4" width="4" height="6" rx="2" fill="rgba(255,255,255,0.3)" style={{ animation: "floatMed 1.5s ease-in-out infinite" }} />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
