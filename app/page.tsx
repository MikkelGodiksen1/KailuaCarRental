"use client";

import { useRef, useState, useCallback, useEffect } from "react";

/* ────────────────────────────────────────────────────────────
   MIKKEL CHARACTER
   ──────────────────────────────────────────────────────────── */
function MikkelCharacter({ walking }: { walking: boolean }) {
  return (
    <div
      className={walking ? "is-walking" : ""}
      style={{ width: 84, height: 136, filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.9))" }}
    >
      <svg viewBox="0 0 84 136" xmlns="http://www.w3.org/2000/svg" overflow="visible">
        <ellipse cx="42" cy="134" rx="22" ry="4" fill="rgba(0,0,0,0.5)" />
        <g className="char-leg-left">
          <rect x="20" y="92" width="16" height="38" rx="6" fill="#1a1f38" />
          <ellipse cx="25" cy="130" rx="12" ry="5" fill="#0e1020" />
        </g>
        <g className="char-leg-right">
          <rect x="48" y="92" width="16" height="38" rx="6" fill="#1a1f38" />
          <ellipse cx="59" cy="130" rx="12" ry="5" fill="#0e1020" />
        </g>
        <g className="char-body">
          <path d="M16,60 Q10,63 10,76 L10,92 Q10,98 18,98 L66,98 Q74,98 74,92 L74,76 Q74,63 68,60 Z" fill="#111111" />
          <path d="M16,60 Q42,56 68,60" stroke="#1e1e1e" strokeWidth="1.5" fill="none" />
          <rect x="30" y="50" width="24" height="18" rx="5" fill="#111111" />
          <rect x="32" y="50" width="20" height="10" rx="4" fill="#1a1a1a" />
          <g className="char-arm-left">
            <path d="M7,63 Q4,67 4,82 Q4,93 12,95 L18,93 L20,68 L14,61 Z" fill="#111111" />
            <circle cx="11" cy="96" r="7" fill="#f3c49e" />
          </g>
          <g className="char-arm-right">
            <path d="M77,63 Q80,67 80,82 Q80,93 72,95 L66,93 L64,68 L70,61 Z" fill="#111111" />
            <circle cx="73" cy="96" r="7" fill="#f3c49e" />
          </g>
          <rect x="34" y="48" width="16" height="16" rx="5" fill="#f3c49e" />
          <circle cx="42" cy="34" r="26" fill="#f3c49e" />
          <path d="M20,37 Q20,55 42,59 Q64,55 64,37" fill="#d4a860" />
          <path d="M23,40 Q23,52 42,56 Q61,52 61,40" fill="#e0bc76" />
          <circle cx="32" cy="29" r="5"   fill="white" />
          <circle cx="52" cy="29" r="5"   fill="white" />
          <circle cx="32" cy="30" r="2.8" fill="#3868c8" />
          <circle cx="52" cy="30" r="2.8" fill="#3868c8" />
          <circle cx="32" cy="30" r="1.4" fill="#0a0e1a" />
          <circle cx="52" cy="30" r="1.4" fill="#0a0e1a" />
          <circle cx="33" cy="29" r="1"   fill="white" />
          <circle cx="53" cy="29" r="1"   fill="white" />
          <path d="M25,22 Q32,18 39,22" stroke="#b8922a" strokeWidth="2"   fill="none" strokeLinecap="round" />
          <path d="M45,22 Q52,18 59,22" stroke="#b8922a" strokeWidth="2"   fill="none" strokeLinecap="round" />
          <path d="M38,36 Q42,42 46,36" stroke="#d08a5a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <path d="M34,48 Q42,54 50,48" stroke="#b86840" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <path d="M17,28 Q16,14 42,10 Q68,14 67,28 Q65,16 42,14 Q19,16 17,28 Z" fill="#c8922a" />
          <path d="M18,26 Q18,8 42,6 Q66,8 66,26 Q62,12 42,10 Q22,12 18,26 Z" fill="#d9a030" />
          <path d="M26,16 Q34,8 42,7 Q50,8 55,14" stroke="#f0c040" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.7" />
          <path d="M18,26 Q16,32 18,38 Q20,30 22,26" fill="#c8922a" />
          <path d="M66,26 Q68,32 66,38 Q64,30 62,26" fill="#c8922a" />
        </g>
      </svg>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   PIXEL STARS background helper
   ──────────────────────────────────────────────────────────── */
function PixelStars({ count = 60 }: { count?: number }) {
  const stars = Array.from({ length: count }, (_, i) => ({
    x: (i * 137.5) % 100,
    y: (i * 97.3) % 80,
    size: (i % 3 === 0) ? 3 : 2,
    delay: (i % 7) * 0.5,
    dur: 1.5 + (i % 4) * 0.6,
  }));
  return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
      {stars.map((s, i) => (
        <rect key={i}
          x={`${s.x}%`} y={`${s.y}%`}
          width={s.size} height={s.size}
          fill="white"
          style={{ animation: `twinkle ${s.dur}s ${s.delay}s ease-in-out infinite` }}
        />
      ))}
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────
   PIXEL GROUND  (platform stripe at bottom)
   ──────────────────────────────────────────────────────────── */
function PixelGround({ color = "#1a3a1a" }: { color?: string }) {
  return (
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "14vh" }}>
      {/* Ground line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "#50c850", boxShadow: "0 0 12px rgba(80,200,80,0.5)" }} />
      {/* Ground fill */}
      <div style={{ position: "absolute", top: 4, left: 0, right: 0, bottom: 0, background: color }} />
      {/* Pixel detail row */}
      <div style={{ position: "absolute", top: 4, left: 0, right: 0, height: 4, background: "#3a9a3a" }} />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   SCENE 1 — HEJ
   ──────────────────────────────────────────────────────────── */
function SceneHej({ goTo }: { goTo: (i: number) => void }) {
  return (
    <div
      className="relative flex-shrink-0 overflow-hidden"
      style={{ width: "100vw", height: "100vh", background: "#050010" }}
    >
      <PixelStars count={80} />

      {/* Moon */}
      <div style={{ position: "absolute", right: "12%", top: "12%" }}>
        <svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
          <circle cx="40" cy="40" r="34" fill="#f8e800" />
          <circle cx="40" cy="40" r="30" fill="#f0d800" />
          {/* Craters */}
          <circle cx="28" cy="32" r="5" fill="#d8c000" />
          <circle cx="50" cy="50" r="4" fill="#d8c000" />
          <circle cx="38" cy="54" r="3" fill="#d8c000" />
        </svg>
      </div>

      {/* Pixel clouds */}
      <div style={{ position: "absolute", right: "28%", top: "20%", animation: "floatSlow 5s ease-in-out infinite" }}>
        <svg width="100" height="36" viewBox="0 0 100 36" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
          <rect x="16" y="20" width="68" height="16" fill="#1a1a40" />
          <rect x="8"  y="12" width="84" height="16" fill="#1a1a40" />
          <rect x="24" y="4"  width="52" height="12" fill="#1a1a40" />
        </svg>
      </div>
      <div style={{ position: "absolute", left: "20%", top: "32%", animation: "floatSlow 6s 1s ease-in-out infinite" }}>
        <svg width="70" height="28" viewBox="0 0 70 28" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
          <rect x="10" y="14" width="50" height="14" fill="#1a1a40" />
          <rect x="4"  y="8"  width="62" height="12" fill="#1a1a40" />
          <rect x="18" y="2"  width="34" height="10" fill="#1a1a40" />
        </svg>
      </div>

      {/* Content */}
      <div className="absolute z-10" style={{ left: "6%", top: "14%", maxWidth: 560 }}>

        {/* Pixel badge */}
        <div className="scene-enter font-pixel" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 14px", border: "2px solid #50c850", background: "rgba(80,200,80,0.12)", marginBottom: 28, fontSize: 8, color: "#50c850", letterSpacing: "0.05em" }}>
          <span style={{ width: 8, height: 8, background: "#50c850", display: "inline-block", animation: "blink 1s step-end infinite" }} />
          ÅBEN FOR NYE PROJEKTER
        </div>

        {/* Headline */}
        <h1 className="scene-enter-d1" style={{ fontSize: "clamp(2.8rem,5.5vw,5rem)", fontWeight: 900, lineHeight: 1.0, color: "white", marginBottom: 10, letterSpacing: "-0.02em" }}>
          Hej, jeg er
        </h1>
        <h1 className="scene-enter-d1" style={{ fontSize: "clamp(2.8rem,5.5vw,5rem)", fontWeight: 900, lineHeight: 1.0, marginBottom: 28, letterSpacing: "-0.02em", color: "#f8e800", textShadow: "0 0 30px rgba(248,232,0,0.5), 3px 3px 0px rgba(180,140,0,0.6)" }}>
          Mikkel.
        </h1>

        {/* Body */}
        <p className="scene-enter-d2" style={{ fontSize: "clamp(1rem,1.8vw,1.25rem)", color: "#c8c8e8", lineHeight: 1.7, marginBottom: 36, maxWidth: 480 }}>
          Freelance webudvikler fra Danmark.<br />
          Jeg laver <strong style={{ color: "#f8e800" }}>hjemmesider</strong> folk faktisk bruger
          og <strong style={{ color: "#00e8e8" }}>automatiseringer</strong> der sparer dig for timer hver uge.
          Ingen bureau-priser, ingen venteliste på 3 måneder.
        </p>

        {/* CTAs */}
        <div className="scene-enter-d3" style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <button
            onClick={() => goTo(3)}
            className="cta-btn font-pixel"
            style={{
              padding: "14px 24px",
              fontSize: 10,
              background: "#f8e800",
              color: "#050010",
              border: "none",
              cursor: "pointer",
              fontWeight: 700,
              boxShadow: "4px 4px 0px #a09000",
              letterSpacing: "0.04em",
            }}
          >
            KOM I GANG
          </button>
          <button
            onClick={() => goTo(1)}
            className="font-pixel"
            style={{ background: "none", border: "2px solid rgba(255,255,255,0.2)", cursor: "pointer", color: "rgba(255,255,255,0.5)", fontSize: 8, padding: "12px 18px", letterSpacing: "0.04em" }}
          >
            SE MERE ▶
          </button>
        </div>
      </div>

      <PixelGround />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   SCENE 2 — HJEMMESIDER
   ──────────────────────────────────────────────────────────── */
function SceneHjemmesider({ goTo }: { goTo: (i: number) => void }) {
  return (
    <div
      className="relative flex-shrink-0 overflow-hidden"
      style={{ width: "100vw", height: "100vh", background: "#000428" }}
    >
      <PixelStars count={50} />

      {/* Pixel city skyline */}
      <svg className="absolute bottom-0 left-0 right-0" style={{ width: "100%", height: "42vh", imageRendering: "pixelated" }}
        viewBox="0 0 1440 300" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        {/* Buildings — flat pixel blocks */}
        <rect x="0"   y="180" width="70"  height="120" fill="#0a1040" />
        <rect x="80"  y="140" width="50"  height="160" fill="#0c1248" />
        <rect x="140" y="160" width="60"  height="140" fill="#0a1040" />
        <rect x="210" y="100" width="40"  height="200" fill="#0c1248" />
        <rect x="260" y="150" width="80"  height="150" fill="#0a1040" />
        <rect x="350" y="120" width="50"  height="180" fill="#0c1248" />
        <rect x="410" y="170" width="70"  height="130" fill="#0a1040" />
        <rect x="490" y="90"  width="60"  height="210" fill="#0c1248" />
        <rect x="560" y="155" width="80"  height="145" fill="#0a1040" />
        <rect x="650" y="130" width="45"  height="170" fill="#0c1248" />
        <rect x="705" y="160" width="75"  height="140" fill="#0a1040" />
        <rect x="790" y="105" width="55"  height="195" fill="#0c1248" />
        <rect x="855" y="145" width="80"  height="155" fill="#0a1040" />
        <rect x="945" y="120" width="50"  height="180" fill="#0c1248" />
        <rect x="1005" y="165" width="70" height="135" fill="#0a1040" />
        <rect x="1085" y="95"  width="55" height="205" fill="#0c1248" />
        <rect x="1150" y="150" width="80" height="150" fill="#0a1040" />
        <rect x="1240" y="125" width="50" height="175" fill="#0c1248" />
        <rect x="1300" y="160" width="75" height="140" fill="#0a1040" />
        <rect x="1385" y="140" width="55" height="160" fill="#0c1248" />
        {/* Yellow windows */}
        {[30,100,160,225,285,370,430,510,580,665,730,810,875,965,1025,1105,1170,1260,1320,1405].map((x, i) => (
          <rect key={i} x={x} y={[190,150,170,115,162,130,182,100,165,140,170,115,155,130,175,105,160,135,170,150][i]}
            width="8" height="8" fill="#f8e800" opacity="0.85"
            style={{ animation: `twinkle ${2+(i%3)*0.7}s ${(i%5)*0.4}s ease-in-out infinite` }} />
        ))}
        {/* Ground */}
        <rect x="0" y="290" width="1440" height="10" fill="#050010" />
      </svg>

      {/* Floating pixel laptop */}
      <div style={{ position: "absolute", right: "5%", top: "12%", animation: "floatSlow 4s ease-in-out infinite" }}>
        <svg width="200" height="140" viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
          {/* Screen */}
          <rect x="20" y="0" width="160" height="100" fill="#0a1040" stroke="#4060f0" strokeWidth="3" />
          <rect x="28" y="8" width="144" height="82" fill="#00040a" />
          {/* Code lines */}
          <rect x="34" y="16" width="50" height="4" fill="#f8e800" opacity="0.9" />
          <rect x="34" y="24" width="80" height="4" fill="#4060f0" opacity="0.8" />
          <rect x="34" y="32" width="65" height="4" fill="#00e8e8" opacity="0.7" />
          <rect x="42" y="40" width="45" height="4" fill="#f8e800" opacity="0.6" />
          <rect x="42" y="48" width="70" height="4" fill="#4060f0" opacity="0.7" />
          <rect x="34" y="56" width="40" height="4" fill="#00e8e8" opacity="0.5" />
          {/* Cursor blink */}
          <rect x="34" y="64" width="8" height="8" fill="#f8e800" style={{ animation: "blink 1s step-end infinite" }} />
          {/* Base */}
          <path d="M8 104 L192 104 L184 122 L16 122 Z" fill="#0a1040" stroke="#4060f0" strokeWidth="3" />
          <rect x="72" y="100" width="56" height="6" fill="#1a2060" />
        </svg>
      </div>

      {/* Content */}
      <div className="absolute z-10" style={{ left: "6%", top: "12%", maxWidth: 500 }}>
        <p className="scene-enter font-pixel" style={{ fontSize: 9, color: "#4060f0", marginBottom: 20, letterSpacing: "0.12em" }}>
          ▶ LEVEL 01
        </p>
        <h2 className="scene-enter-d1" style={{ fontSize: "clamp(2.4rem,4.5vw,4rem)", fontWeight: 900, lineHeight: 1.05, color: "white", marginBottom: 8, letterSpacing: "-0.02em" }}>
          Skarpe
        </h2>
        <h2 className="scene-enter-d1" style={{ fontSize: "clamp(2.4rem,4.5vw,4rem)", fontWeight: 900, lineHeight: 1.05, marginBottom: 22, letterSpacing: "-0.02em", color: "#4080ff", textShadow: "3px 3px 0px rgba(30,50,180,0.6)" }}>
          hjemmesider.
        </h2>
        <p className="scene-enter-d2" style={{ color: "#a0b0d8", fontSize: "clamp(0.95rem,1.6vw,1.1rem)", lineHeight: 1.7, marginBottom: 24, maxWidth: 420 }}>
          Ingen tunge CMS-systemer, ingen måneder i venteposition.
          Din hjemmeside er hurtig, ser skarp ud og er klar inden for få uger.
        </p>
        <ul className="scene-enter-d2" style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
          {["Next.js + Tailwind", "Mobilvenlig & tilgængelig", "SEO-optimeret fra dag ét", "Deployeret på Vercel"].map((p) => (
            <li key={p} style={{ display: "flex", alignItems: "center", gap: 10, color: "#8898c0", fontSize: 15 }}>
              <span style={{ color: "#4080ff", fontWeight: 900, fontSize: 16 }}>■</span>
              {p}
            </li>
          ))}
        </ul>
        <div className="scene-enter-d3">
          <button onClick={() => goTo(3)} className="cta-btn font-pixel"
            style={{ padding: "12px 22px", fontSize: 9, background: "#4060f0", color: "white", border: "none", cursor: "pointer", boxShadow: "4px 4px 0px #1a2080", letterSpacing: "0.04em" }}>
            KONTAKT MIG ▶
          </button>
        </div>
      </div>

      <PixelGround color="#000428" />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   SCENE 3 — AUTOMATISERING
   ──────────────────────────────────────────────────────────── */
function SceneAutomatisering({ goTo }: { goTo: (i: number) => void }) {
  return (
    <div
      className="relative flex-shrink-0 overflow-hidden"
      style={{ width: "100vw", height: "100vh", background: "#001418" }}
    >
      <PixelStars count={40} />

      {/* Pixel terminal / computer */}
      <div style={{ position: "absolute", right: "5%", top: "10%", animation: "floatSlow 4.5s ease-in-out infinite" }}>
        <svg width="230" height="180" viewBox="0 0 230 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
          {/* Monitor body */}
          <rect x="0" y="0" width="230" height="150" fill="#001a20" stroke="#00e8e8" strokeWidth="3" />
          <rect x="8" y="8" width="214" height="132" fill="#000c10" />
          {/* Terminal text lines */}
          <rect x="16" y="18" width="12" height="8" fill="#00e8e8" />
          <rect x="32" y="18" width="90" height="8" fill="#00e8e8" opacity="0.8" />
          <rect x="16" y="32" width="12" height="8" fill="#00e8e8" opacity="0.4" />
          <rect x="32" y="32" width="60" height="8" fill="#38d838" opacity="0.9" />
          <rect x="16" y="46" width="12" height="8" fill="#00e8e8" opacity="0.4" />
          <rect x="32" y="46" width="110" height="8" fill="#38d838" opacity="0.7" />
          <rect x="16" y="60" width="12" height="8" fill="#00e8e8" opacity="0.4" />
          <rect x="32" y="60" width="75" height="8" fill="#f8e800" opacity="0.8" />
          <rect x="16" y="74" width="12" height="8" fill="#00e8e8" opacity="0.4" />
          <rect x="32" y="74" width="130" height="8" fill="#00e8e8" opacity="0.6" />
          <rect x="16" y="88" width="12" height="8" fill="#00e8e8" opacity="0.4" />
          <rect x="32" y="88" width="50" height="8" fill="#38d838" opacity="0.9" />
          {/* Blinking cursor */}
          <rect x="86" y="88" width="10" height="8" fill="#38d838" style={{ animation: "blink 1s step-end infinite" }} />
          {/* Stand */}
          <rect x="95" y="150" width="40" height="12" fill="#001a20" stroke="#00e8e8" strokeWidth="2" />
          <rect x="70" y="162" width="90" height="10" fill="#001a20" stroke="#00e8e8" strokeWidth="2" />
        </svg>
      </div>

      {/* Rotating pixel gear */}
      <div style={{ position: "absolute", right: "8%", top: "52%", animation: "spinSlow 8s linear infinite" }}>
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
          <rect x="20" y="0"  width="24" height="8"  fill="#00e8e8" />
          <rect x="20" y="56" width="24" height="8"  fill="#00e8e8" />
          <rect x="0"  y="20" width="8"  height="24" fill="#00e8e8" />
          <rect x="56" y="20" width="8"  height="24" fill="#00e8e8" />
          <rect x="8"  y="8"  width="8"  height="8"  fill="#00e8e8" />
          <rect x="48" y="8"  width="8"  height="8"  fill="#00e8e8" />
          <rect x="8"  y="48" width="8"  height="8"  fill="#00e8e8" />
          <rect x="48" y="48" width="8"  height="8"  fill="#00e8e8" />
          <rect x="8"  y="8"  width="48" height="48" fill="none" stroke="#00e8e8" strokeWidth="2" />
          <rect x="20" y="20" width="24" height="24" fill="#001418" stroke="#00e8e8" strokeWidth="2" />
          <rect x="26" y="26" width="12" height="12" fill="#00e8e8" />
        </svg>
      </div>

      {/* Content */}
      <div className="absolute z-10" style={{ left: "6%", top: "12%", maxWidth: 500 }}>
        <p className="scene-enter font-pixel" style={{ fontSize: 9, color: "#00e8e8", marginBottom: 20, letterSpacing: "0.12em" }}>
          ▶ LEVEL 02
        </p>
        <h2 className="scene-enter-d1" style={{ fontSize: "clamp(2.4rem,4.5vw,4rem)", fontWeight: 900, lineHeight: 1.05, color: "white", marginBottom: 8, letterSpacing: "-0.02em" }}>
          Intelligente
        </h2>
        <h2 className="scene-enter-d1" style={{ fontSize: "clamp(2.4rem,4.5vw,4rem)", fontWeight: 900, lineHeight: 1.05, marginBottom: 22, letterSpacing: "-0.02em", color: "#00e8e8", textShadow: "3px 3px 0px rgba(0,120,120,0.6)" }}>
          automatiseringer.
        </h2>
        <p className="scene-enter-d2" style={{ color: "#80b0a8", fontSize: "clamp(0.95rem,1.6vw,1.1rem)", lineHeight: 1.7, marginBottom: 24, maxWidth: 420 }}>
          Har du opgaver der gentages igen og igen?
          Dem løser vi én gang — og så kører det selv.
          Du behøver ikke forstå en linje kode.
        </p>
        <ul className="scene-enter-d2" style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
          {["AI-drevne workflows", "CRM & systemintegrationer", "Automatiske datapipelines", "Bots & agenter der faktisk virker"].map((p) => (
            <li key={p} style={{ display: "flex", alignItems: "center", gap: 10, color: "#6a9890", fontSize: 15 }}>
              <span style={{ color: "#00e8e8", fontWeight: 900, fontSize: 16 }}>■</span>
              {p}
            </li>
          ))}
        </ul>
        <div className="scene-enter-d3">
          <button onClick={() => goTo(3)} className="cta-btn font-pixel"
            style={{ padding: "12px 22px", fontSize: 9, background: "#00c8c8", color: "#001418", border: "none", cursor: "pointer", boxShadow: "4px 4px 0px #006868", letterSpacing: "0.04em" }}>
            KONTAKT MIG ▶
          </button>
        </div>
      </div>

      <PixelGround color="#001418" />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   SCENE 4 — KONTAKT
   ──────────────────────────────────────────────────────────── */
function SceneKontakt() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, company }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    border: "2px solid rgba(248,232,0,0.3)",
    background: "rgba(248,232,0,0.05)",
    color: "white",
    fontSize: 15,
    outline: "none",
    fontFamily: "Inter, sans-serif",
  };

  return (
    <div
      className="relative flex-shrink-0 overflow-hidden"
      style={{ width: "100vw", height: "100vh", background: "#0a0010" }}
    >
      <PixelStars count={60} />

      {/* Big pixel envelope decoration */}
      <div style={{ position: "absolute", right: "5%", top: "14%", animation: "floatSlow 5s ease-in-out infinite" }}>
        <svg width="180" height="130" viewBox="0 0 180 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
          {/* Envelope body */}
          <rect x="0" y="20" width="180" height="110" fill="#1a0828" stroke="#f8e800" strokeWidth="3" />
          {/* Flap */}
          <path d="M0,20 L90,75 L180,20" stroke="#f8e800" strokeWidth="3" fill="none" />
          {/* Bottom corners */}
          <line x1="0" y1="130" x2="65" y2="75" stroke="#c0a800" strokeWidth="2" />
          <line x1="180" y1="130" x2="115" y2="75" stroke="#c0a800" strokeWidth="2" />
          {/* Pixel heart/star */}
          <rect x="76" y="62" width="28" height="8" fill="#f8e800" />
          <rect x="68" y="70" width="44" height="8" fill="#f8e800" />
          <rect x="76" y="78" width="28" height="8" fill="#f8e800" />
        </svg>
      </div>

      {/* Content */}
      <div className="absolute z-10" style={{ left: "6%", top: "10%", maxWidth: 500 }}>
        <p className="scene-enter font-pixel" style={{ fontSize: 9, color: "#f8e800", marginBottom: 20, letterSpacing: "0.12em" }}>
          ▶ LEVEL 03
        </p>
        <h2 className="scene-enter-d1" style={{ fontSize: "clamp(2.2rem,4vw,3.8rem)", fontWeight: 900, lineHeight: 1.05, color: "white", marginBottom: 8, letterSpacing: "-0.02em" }}>
          Tag fat i
        </h2>
        <h2 className="scene-enter-d1" style={{ fontSize: "clamp(2.2rem,4vw,3.8rem)", fontWeight: 900, lineHeight: 1.05, marginBottom: 16, letterSpacing: "-0.02em", color: "#f8e800", textShadow: "3px 3px 0px rgba(160,120,0,0.6)" }}>
          mig.
        </h2>
        <p className="scene-enter-d1" style={{ color: "#a890b8", fontSize: 16, lineHeight: 1.65, marginBottom: 16 }}>
          Skriv dit navn og nummer — så ringer jeg op.<br />
          Ingen salgspitch, bare en snak.
        </p>

        {/* Phone */}
        <a href="tel:+4531552108" className="scene-enter-d2 font-pixel"
          style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20, color: "#f8e800", fontSize: 9, textDecoration: "none", padding: "10px 16px", border: "2px solid #f8e800", background: "rgba(248,232,0,0.08)", letterSpacing: "0.04em" }}>
          ☎ +45 31 55 21 08
        </a>

        {status === "sent" ? (
          <div style={{ padding: "20px 24px", border: "3px solid #38d838", background: "rgba(56,216,56,0.08)", textAlign: "center" }}>
            <p className="font-pixel" style={{ color: "#38d838", fontWeight: 700, fontSize: 10, marginBottom: 8 }}>BESKED SENDT!</p>
            <p style={{ color: "#80b080", fontSize: 14 }}>Jeg vender tilbage hurtigst muligt.</p>
          </div>
        ) : (
          <form className="scene-enter-d3" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div>
                <label className="font-pixel" style={{ display: "block", fontSize: 7, color: "#907898", marginBottom: 6, letterSpacing: "0.06em" }}>NAVN *</label>
                <input style={inputStyle} type="text" required placeholder="Dit navn"
                  value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div>
                <label className="font-pixel" style={{ display: "block", fontSize: 7, color: "#907898", marginBottom: 6, letterSpacing: "0.06em" }}>TELEFON *</label>
                <input style={inputStyle} type="tel" required placeholder="Dit nr."
                  value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="font-pixel" style={{ display: "block", fontSize: 7, color: "#907898", marginBottom: 6, letterSpacing: "0.06em" }}>VIRKSOMHED *</label>
              <input style={inputStyle} type="text" required placeholder="Din virksomhed"
                value={company} onChange={e => setCompany(e.target.value)} />
            </div>
            {status === "error" && (
              <p className="font-pixel" style={{ fontSize: 7, color: "#f83838" }}>FEJL — prøv igen eller ring direkte.</p>
            )}
            <button type="submit" disabled={status === "sending"} className="cta-btn font-pixel"
              style={{
                padding: "14px 24px", fontSize: 10,
                background: status === "sending" ? "#806000" : "#f8e800",
                color: "#050010",
                border: "none", cursor: status === "sending" ? "not-allowed" : "pointer",
                boxShadow: status === "sending" ? "none" : "4px 4px 0px #a09000",
                marginTop: 4, letterSpacing: "0.04em",
              }}>
              {status === "sending" ? "SENDER..." : "SEND BESKED ▶"}
            </button>
          </form>
        )}
      </div>

      <PixelGround color="#0a0010" />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   MAIN PAGE
   ──────────────────────────────────────────────────────────── */
export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState(0);
  const [walking, setWalking] = useState(false);
  const walkTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scenes = [
    { label: "HEJ",            color: "#f8e800" },
    { label: "HJEMMESIDER",    color: "#4080ff" },
    { label: "AUTOMATISERING", color: "#00e8e8" },
    { label: "KONTAKT",        color: "#f8e800" },
  ];

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const current = Math.round(containerRef.current.scrollLeft / window.innerWidth);
    setScene(Math.min(current, scenes.length - 1));
    setWalking(true);
    if (walkTimer.current) clearTimeout(walkTimer.current);
    walkTimer.current = setTimeout(() => setWalking(false), 300);
  }, [scenes.length]);

  const goTo = useCallback((i: number) => {
    const target = Math.max(0, Math.min(i, scenes.length - 1));
    containerRef.current?.scrollTo({ left: target * window.innerWidth, behavior: "smooth" });
  }, [scenes.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        setScene(prev => { const next = Math.min(prev + 1, scenes.length - 1); goTo(next); return prev; });
      }
      if (e.key === "ArrowLeft"  || e.key === "a" || e.key === "A") {
        setScene(prev => { const next = Math.max(prev - 1, 0); goTo(next); return prev; });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, scenes.length]);

  return (
    <>
      {/* ── Scanlines ── */}
      <div className="scanline-overlay" />

      {/* ── Top pixel progress bar ── */}
      <div style={{
        position: "fixed", top: 0, left: 0, height: 4,
        width: `${(scene / (scenes.length - 1)) * 100}%`,
        background: scenes[scene].color,
        zIndex: 100,
        transition: "width 0.2s steps(20, end)",
        imageRendering: "pixelated",
      }} />

      {/* ── HUD top-right: SCORE style scene label ── */}
      <div className="font-pixel" style={{
        position: "fixed", top: 12, right: 18, zIndex: 100,
        display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4,
      }}>
        <span style={{ fontSize: 7, color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em" }}>
          {(scene + 1).toString().padStart(2, "0")} - 04
        </span>
        <span style={{ fontSize: 8, color: scenes[scene].color, letterSpacing: "0.1em" }}>
          {scenes[scene].label}
        </span>
      </div>

      {/* ── Bottom dot nav ── */}
      <div style={{
        position: "fixed", bottom: 18, left: "50%", transform: "translateX(-50%)",
        zIndex: 100, display: "flex", gap: 12, alignItems: "center",
      }}>
        {scenes.map((s, i) => (
          <button key={s.label} onClick={() => goTo(i)} title={s.label}
            style={{
              width: scene === i ? 14 : 8,
              height: scene === i ? 14 : 8,
              background: scene === i ? s.color : "rgba(255,255,255,0.2)",
              border: scene === i ? `2px solid ${s.color}` : "2px solid rgba(255,255,255,0.15)",
              cursor: "pointer",
              padding: 0,
              imageRendering: "pixelated",
              boxShadow: scene === i ? `0 0 10px ${s.color}` : "none",
            }} />
        ))}
      </div>

      {/* ── Scroll hint scene 0 ── */}
      {scene === 0 && (
        <div className="font-pixel" style={{
          position: "fixed", bottom: 18, right: 18, zIndex: 100,
          fontSize: 7, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em",
          animation: "floatMed 1.8s ease-in-out infinite",
        }}>
          ▶ SCROLL
        </div>
      )}

      {/* ── Horizontal snap container ── */}
      <div
        ref={containerRef}
        className="snap-scroll"
        onScroll={handleScroll}
        style={{
          display: "flex",
          overflowX: "scroll",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          height: "100vh",
          width: "100vw",
        }}
      >
        <SceneHej goTo={goTo} />
        <SceneHjemmesider goTo={goTo} />
        <SceneAutomatisering goTo={goTo} />
        <SceneKontakt />
      </div>

      {/* ── Mikkel character ── */}
      <div style={{ position: "fixed", bottom: "14vh", left: "46%", transform: "translateX(-50%)", zIndex: 30, pointerEvents: "none" }}>
        <MikkelCharacter walking={walking} />
      </div>
    </>
  );
}
