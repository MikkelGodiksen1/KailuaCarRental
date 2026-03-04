"use client";

import { useRef, useState, useCallback } from "react";

/* ──────────────────────────────────────────────────────
   MIKKEL CHARACTER  (SVG: blonde hair · turtleneck · beard)
   ────────────────────────────────────────────────────── */
function MikkelCharacter({ walking }: { walking: boolean }) {
  return (
    <div
      className={walking ? "is-walking" : ""}
      style={{ width: 84, height: 136, filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.7))" }}
    >
      <svg viewBox="0 0 84 136" xmlns="http://www.w3.org/2000/svg" overflow="visible">

        {/* Shadow */}
        <ellipse cx="42" cy="134" rx="22" ry="4" fill="rgba(0,0,0,0.35)" />

        {/* ── LEFT LEG ── */}
        <g className="char-leg-left">
          <rect x="20" y="92" width="16" height="38" rx="6" fill="#1a1f38" />
          <ellipse cx="25" cy="130" rx="12" ry="5" fill="#0e1020" />
        </g>

        {/* ── RIGHT LEG ── */}
        <g className="char-leg-right">
          <rect x="48" y="92" width="16" height="38" rx="6" fill="#1a1f38" />
          <ellipse cx="59" cy="130" rx="12" ry="5" fill="#0e1020" />
        </g>

        {/* ── BODY GROUP ── */}
        <g className="char-body">

          {/* Turtleneck body */}
          <path
            d="M16,60 Q10,63 10,76 L10,92 Q10,98 18,98 L66,98 Q74,98 74,92 L74,76 Q74,63 68,60 Z"
            fill="#111111"
          />
          {/* Shoulder width highlight */}
          <path d="M16,60 Q42,56 68,60" stroke="#1e1e1e" strokeWidth="1.5" fill="none" />

          {/* Turtleneck collar */}
          <rect x="30" y="50" width="24" height="18" rx="5" fill="#111111" />
          <rect x="32" y="50" width="20" height="10" rx="4" fill="#1a1a1a" />

          {/* ── LEFT ARM ── */}
          <g className="char-arm-left">
            <path d="M7,63 Q4,67 4,82 Q4,93 12,95 L18,93 L20,68 L14,61 Z" fill="#111111" />
            <circle cx="11" cy="96" r="7" fill="#f3c49e" />
          </g>

          {/* ── RIGHT ARM ── */}
          <g className="char-arm-right">
            <path d="M77,63 Q80,67 80,82 Q80,93 72,95 L66,93 L64,68 L70,61 Z" fill="#111111" />
            <circle cx="73" cy="96" r="7" fill="#f3c49e" />
          </g>

          {/* ── NECK ── */}
          <rect x="34" y="48" width="16" height="16" rx="5" fill="#f3c49e" />

          {/* ── HEAD ── */}
          <circle cx="42" cy="34" r="26" fill="#f3c49e" />

          {/* ── BEARD (sandy-blonde) ── */}
          <path d="M20,37 Q20,55 42,59 Q64,55 64,37" fill="#d4a860" />
          <path d="M23,40 Q23,52 42,56 Q61,52 61,40" fill="#e0bc76" />

          {/* ── EYES ── */}
          <circle cx="32" cy="29" r="5"   fill="white" />
          <circle cx="52" cy="29" r="5"   fill="white" />
          <circle cx="32" cy="30" r="2.8" fill="#3868c8" />
          <circle cx="52" cy="30" r="2.8" fill="#3868c8" />
          <circle cx="32" cy="30" r="1.4" fill="#0a0e1a" />
          <circle cx="52" cy="30" r="1.4" fill="#0a0e1a" />
          <circle cx="33" cy="29" r="1"   fill="white" />
          <circle cx="53" cy="29" r="1"   fill="white" />

          {/* ── EYEBROWS (blonde/sandy) ── */}
          <path d="M25,22 Q32,18 39,22" stroke="#b8922a" strokeWidth="2"   fill="none" strokeLinecap="round" />
          <path d="M45,22 Q52,18 59,22" stroke="#b8922a" strokeWidth="2"   fill="none" strokeLinecap="round" />

          {/* ── NOSE ── */}
          <path d="M38,36 Q42,42 46,36" stroke="#d08a5a" strokeWidth="1.6" fill="none" strokeLinecap="round" />

          {/* ── SMILE ── */}
          <path d="M34,48 Q42,54 50,48" stroke="#b86840" strokeWidth="1.6" fill="none" strokeLinecap="round" />

          {/* ── HAIR (golden-blonde, swept back) ── */}
          {/* Back/sides of hair (behind head) */}
          <path
            d="M17,28 Q16,14 42,10 Q68,14 67,28 Q65,16 42,14 Q19,16 17,28 Z"
            fill="#c8922a"
          />
          {/* Main hair top */}
          <path
            d="M18,26 Q18,8 42,6 Q66,8 66,26 Q62,12 42,10 Q22,12 18,26 Z"
            fill="#d9a030"
          />
          {/* Hair highlight */}
          <path
            d="M26,16 Q34,8 42,7 Q50,8 55,14"
            stroke="#f0c040"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            opacity="0.6"
          />
          {/* Side sweep left */}
          <path
            d="M18,26 Q16,32 18,38 Q20,30 22,26"
            fill="#c8922a"
          />
          {/* Side sweep right */}
          <path
            d="M66,26 Q68,32 66,38 Q64,30 62,26"
            fill="#c8922a"
          />

        </g>{/* end char-body */}
      </svg>
    </div>
  );
}

/* ──────────────────────────────────────────────────────
   SCENE 1 — HEJ  (deep space · stars)
   ────────────────────────────────────────────────────── */
function SceneHej() {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    x: (i * 137.5) % 100,
    y: (i * 97.3) % 76,
    r: ((i % 3) + 1) * 0.55,
    delay: (i % 5) * 0.4,
    dur: 2 + (i % 4) * 0.8,
  }));

  return (
    <div
      className="relative flex-shrink-0 snap-start overflow-hidden"
      style={{ width: "100vw", height: "100vh", background: "linear-gradient(165deg,#060616 0%,#0d0d30 55%,#12082e 100%)" }}
    >
      {/* Stars */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {stars.map((s, i) => (
          <circle key={i} cx={`${s.x}%`} cy={`${s.y}%`} r={s.r} fill="white"
            style={{ animation: `twinkle ${s.dur}s ${s.delay}s ease-in-out infinite` }} />
        ))}
        <ellipse cx="72%" cy="35%" rx="200" ry="130" fill="rgba(100,60,220,0.07)" />
        <ellipse cx="22%" cy="52%" rx="160" ry="100" fill="rgba(60,80,220,0.05)" />
      </svg>

      {/* Floating laptop */}
      <div className="absolute" style={{ right: "7%", top: "18%", animation: "floatSlow 4s ease-in-out infinite" }}>
        <svg width="155" height="108" viewBox="0 0 155 108" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="18" y="0" width="119" height="78" rx="8" fill="#1a1f38" stroke="#2a3060" strokeWidth="1.5" />
          <rect x="24" y="6" width="107" height="62" rx="5" fill="#0d1026" />
          <rect x="30" y="13" width="44" height="3" rx="1.5" fill="#7c6aec" opacity="0.8" />
          <rect x="30" y="20" width="68" height="3" rx="1.5" fill="#4a9eff" opacity="0.6" />
          <rect x="30" y="27" width="52" height="3" rx="1.5" fill="#4a9eff" opacity="0.5" />
          <rect x="36" y="34" width="38" height="3" rx="1.5" fill="#3ecfcf" opacity="0.7" />
          <rect x="36" y="41" width="58" height="3" rx="1.5" fill="#7c6aec" opacity="0.5" />
          <rect x="30" y="48" width="32" height="3" rx="1.5" fill="#4a9eff" opacity="0.4" />
          <rect x="90" y="54" width="2" height="10" rx="1" fill="#7c6aec" opacity="0.9"
            style={{ animation: "twinkle 1s ease-in-out infinite" }} />
          <path d="M4 81 L151 81 L144 93 L11 93 Z" fill="#1a1f38" stroke="#2a3060" strokeWidth="1.5" />
          <rect x="53" y="78" width="49" height="5" rx="2" fill="#2a3060" />
        </svg>
      </div>

      {/* Orbs */}
      <div className="absolute" style={{ left: "14%", top: "28%", animation: "floatMed 3.2s 0.5s ease-in-out infinite" }}>
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "rgba(124,106,236,0.6)", boxShadow: "0 0 20px rgba(124,106,236,0.4)" }} />
      </div>
      <div className="absolute" style={{ right: "26%", top: "62%", animation: "floatMed 2.8s 1s ease-in-out infinite" }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(74,158,255,0.5)", boxShadow: "0 0 14px rgba(74,158,255,0.4)" }} />
      </div>

      {/* Content */}
      <div className="absolute z-10 flex flex-col" style={{ left: "6%", top: "16%", maxWidth: 480 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, border: "1px solid rgba(124,106,236,0.3)", background: "rgba(124,106,236,0.08)", marginBottom: 24, width: "fit-content" }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#7c6aec", animation: "pulseGlow 2s ease-in-out infinite", display: "inline-block" }} />
          <span style={{ fontSize: 12, color: "#a090e8", letterSpacing: "0.05em" }}>Åben for nye projekter</span>
        </div>
        <h1 style={{ fontSize: "clamp(2.2rem,4.5vw,3.8rem)", fontWeight: 800, lineHeight: 1.1, color: "white", marginBottom: 20 }}>
          Hej, jeg er{" "}
          <span style={{ background: "linear-gradient(135deg,#a78bfa,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Mikkel.
          </span>
        </h1>
        <p style={{ fontSize: "clamp(1rem,1.8vw,1.2rem)", color: "#9090b8", lineHeight: 1.7, marginBottom: 32 }}>
          Jeg bygger <strong style={{ color: "#c4b5fd" }}>hjemmesider</strong> og{" "}
          <strong style={{ color: "#93c5fd" }}>automatiseringer</strong> for ambitiøse virksomheder —
          hurtigt, skarpt og bygget til at holde.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#6060a0", fontSize: 13 }}>
          <span>Swipe for at udforske</span>
          <span style={{ fontSize: 18 }}>→</span>
        </div>
      </div>

      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0" style={{ height: "14vh", background: "linear-gradient(to top,#06060f 0%,#0a0a1e 60%,transparent 100%)" }} />
      <div className="absolute left-0 right-0" style={{ bottom: "14vh", height: 2, background: "linear-gradient(90deg,transparent,rgba(90,60,200,0.3),rgba(60,100,200,0.3),transparent)" }} />
    </div>
  );
}

/* ──────────────────────────────────────────────────────
   SCENE 2 — HJEMMESIDER  (city night)
   ────────────────────────────────────────────────────── */
function SceneHjemmesider() {
  return (
    <div
      className="relative flex-shrink-0 snap-start overflow-hidden"
      style={{ width: "100vw", height: "100vh", background: "linear-gradient(165deg,#040810 0%,#070d22 50%,#090d20 100%)" }}
    >
      {/* City silhouette */}
      <svg className="absolute bottom-0 left-0 right-0" style={{ width: "100%", height: "40vh" }}
        viewBox="0 0 1440 300" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0"   y="160" width="60"  height="140" fill="#0a0e1c" />
        <rect x="20"  y="130" width="30"  height="170" fill="#0a0e1c" />
        <rect x="70"  y="180" width="50"  height="120" fill="#0a0e1c" />
        <rect x="130" y="120" width="45"  height="180" fill="#0c1022" />
        <rect x="145" y="90"  width="20"  height="210" fill="#0c1022" />
        <rect x="190" y="155" width="70"  height="145" fill="#0a0e1c" />
        <rect x="270" y="100" width="55"  height="200" fill="#0c1022" />
        <rect x="290" y="80"  width="18"  height="220" fill="#0c1022" />
        <rect x="340" y="140" width="80"  height="160" fill="#0a0e1c" />
        <rect x="430" y="110" width="40"  height="190" fill="#0c1022" />
        <rect x="480" y="160" width="90"  height="140" fill="#0a0e1c" />
        <rect x="580" y="90"  width="60"  height="210" fill="#0c1022" />
        <rect x="600" y="60"  width="22"  height="240" fill="#0c1022" />
        <rect x="650" y="150" width="70"  height="150" fill="#0a0e1c" />
        <rect x="730" y="110" width="50"  height="190" fill="#0c1022" />
        <rect x="790" y="170" width="80"  height="130" fill="#0a0e1c" />
        <rect x="880" y="100" width="45"  height="200" fill="#0c1022" />
        <rect x="895" y="70"  width="18"  height="230" fill="#0c1022" />
        <rect x="940" y="140" width="70"  height="160" fill="#0a0e1c" />
        <rect x="1020" y="115" width="55" height="185" fill="#0c1022" />
        <rect x="1085" y="155" width="90" height="145" fill="#0a0e1c" />
        <rect x="1185" y="100" width="50" height="200" fill="#0c1022" />
        <rect x="1200" y="70"  width="20" height="230" fill="#0c1022" />
        <rect x="1250" y="145" width="65" height="155" fill="#0a0e1c" />
        <rect x="1330" y="120" width="55" height="180" fill="#0c1022" />
        <rect x="1390" y="160" width="50" height="140" fill="#0a0e1c" />
        {[30,85,140,155,205,280,350,440,500,595,660,740,800,890,950,1030,1095,1195,1260,1345].map((x, i) => {
          const y = [140,160,100,110,160,110,150,120,170,100,160,120,180,110,150,125,165,110,155,130][i];
          return <rect key={i} x={x} y={y} width="4" height="4" fill={i%3===0?"#4a9eff":i%3===1?"#7c6aec":"#ffcc44"} opacity="0.7"
            style={{ animation: `twinkle ${2+(i%4)*0.5}s ${(i%5)*0.3}s ease-in-out infinite` }} />;
        })}
        <rect x="0" y="270" width="1440" height="30" fill="#06060f" />
      </svg>

      {/* Floating browser windows */}
      <div className="absolute" style={{ right: "5%", top: "10%", animation: "floatSlow 4.5s ease-in-out infinite" }}>
        <svg width="220" height="148" viewBox="0 0 220 148" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="220" height="148" rx="10" fill="#0d1226" stroke="#1e2a50" strokeWidth="1.5" />
          <rect width="220" height="28" rx="10" fill="#121830" />
          <rect x="0" y="18" width="220" height="10" fill="#121830" />
          <circle cx="14" cy="14" r="4" fill="#ff5f57" />
          <circle cx="26" cy="14" r="4" fill="#ffbd2e" />
          <circle cx="38" cy="14" r="4" fill="#28c840" />
          <rect x="50" y="8" width="120" height="12" rx="4" fill="#1a2040" />
          <rect x="56" y="12" width="40" height="4" rx="2" fill="#3a9fff" opacity="0.7" />
          <rect x="12" y="38" width="90" height="8"  rx="3" fill="#7c6aec" opacity="0.8" />
          <rect x="12" y="52" width="130" height="5" rx="2" fill="#4060a0" opacity="0.6" />
          <rect x="12" y="62" width="110" height="5" rx="2" fill="#4060a0" opacity="0.5" />
          <rect x="12" y="80" width="55"  height="22" rx="6" fill="#7c6aec" opacity="0.7" />
          <rect x="80" y="83" width="35"  height="16" rx="5" fill="transparent" stroke="#7c6aec" strokeWidth="1" />
          <rect x="130" y="38" width="78" height="96" rx="6" fill="#0a0e20" stroke="#1e2a50" strokeWidth="1" />
          <circle cx="169" cy="70" r="20" fill="#1a2040" />
          <circle cx="169" cy="70" r="12" fill="#2a3060" />
        </svg>
      </div>
      <div className="absolute" style={{ right: "28%", top: "56%", animation: "floatMed 3.2s 1.2s ease-in-out infinite" }}>
        <svg width="138" height="88" viewBox="0 0 138 88" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="138" height="88" rx="8" fill="#0d1226" stroke="#1e2a50" strokeWidth="1.2" />
          <rect width="138" height="20" rx="8" fill="#121830" />
          <rect x="0" y="12" width="138" height="8" fill="#121830" />
          <circle cx="10" cy="10" r="3" fill="#ff5f57" />
          <circle cx="19" cy="10" r="3" fill="#ffbd2e" />
          <circle cx="28" cy="10" r="3" fill="#28c840" />
          <rect x="8" y="28" width="60" height="6" rx="2" fill="#3ecfcf" opacity="0.7" />
          <rect x="8" y="38" width="90" height="4" rx="2" fill="#4060a0" opacity="0.5" />
          <rect x="8" y="60" width="40" height="16" rx="5" fill="#3ecfcf" opacity="0.6" />
        </svg>
      </div>

      {/* Content */}
      <div className="absolute z-10 flex flex-col" style={{ left: "6%", top: "14%", maxWidth: 460 }}>
        <p style={{ fontSize: 11, letterSpacing: "0.18em", color: "#4a9eff", marginBottom: 14, fontWeight: 600, textTransform: "uppercase" }}>
          // 01 — Hjemmesider
        </p>
        <h2 style={{ fontSize: "clamp(2rem,4vw,3.4rem)", fontWeight: 800, lineHeight: 1.1, color: "white", marginBottom: 16 }}>
          Skarpe{" "}
          <span style={{ background: "linear-gradient(135deg,#60a5fa,#818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            hjemmesider.
          </span>
        </h2>
        <p style={{ color: "#7080a8", fontSize: "clamp(0.9rem,1.6vw,1.05rem)", lineHeight: 1.7, marginBottom: 28 }}>
          Hurtige, smukke hjemmesider der konverterer.
          Bygget med moderne tech og klar på få uger.
        </p>
        <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
          {["Next.js + Tailwind", "Mobilvenlig & tilgængelig", "SEO-optimeret", "Deployeret på Vercel"].map((p) => (
            <li key={p} style={{ display: "flex", alignItems: "center", gap: 10, color: "#8090b8", fontSize: 14 }}>
              <span style={{ color: "#4a9eff", fontSize: 16 }}>✦</span>
              {p}
            </li>
          ))}
        </ul>
      </div>

      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0" style={{ height: "14vh", background: "linear-gradient(to top,#06060f 0%,#0a0a1e 60%,transparent 100%)" }} />
      <div className="absolute left-0 right-0" style={{ bottom: "14vh", height: 2, background: "linear-gradient(90deg,transparent,rgba(60,100,200,0.35),rgba(60,200,200,0.2),transparent)" }} />
    </div>
  );
}

/* ──────────────────────────────────────────────────────
   SCENE 3 — AUTOMATISERING  (circuit board)
   ────────────────────────────────────────────────────── */
function SceneAutomatisering() {
  return (
    <div
      className="relative flex-shrink-0 snap-start overflow-hidden"
      style={{ width: "100vw", height: "100vh", background: "linear-gradient(165deg,#03080e 0%,#050d18 55%,#040c15 100%)" }}
    >
      {/* Circuit board bg */}
      <svg className="absolute inset-0" style={{ width: "100%", height: "100%", opacity: 0.22 }}
        viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        {[80,160,240,320,420,520,620,720].map((y, i) => (
          <line key={`h${i}`} x1="0" y1={y} x2="1440" y2={y} stroke="#1e8a8a" strokeWidth="0.8"
            strokeDasharray="20 40" style={{ animation: `dash ${3+i*0.4}s linear infinite` }} />
        ))}
        {[120,240,380,520,660,800,960,1100,1280].map((x, i) => (
          <line key={`v${i}`} x1={x} y1="0" x2={x} y2="900" stroke="#1e8a8a" strokeWidth="0.8"
            strokeDasharray="20 60" style={{ animation: `dash ${4+i*0.3}s linear infinite` }} />
        ))}
        {[[120,80],[240,160],[380,240],[520,80],[660,160],[800,320],[960,80],[1100,240],[1280,160],
          [120,420],[380,520],[660,420],[960,520],[1280,420]].map(([x, y], i) => (
          <circle key={`n${i}`} cx={x} cy={y} r="4" fill="none" stroke="#1e8a8a" strokeWidth="1.2"
            style={{ animation: `twinkle ${2+(i%4)*0.6}s ${(i%5)*0.4}s ease-in-out infinite` }} />
        ))}
      </svg>

      {/* Gear large */}
      <div className="absolute" style={{ right: "9%", top: "14%", animation: "spinSlow 12s linear infinite" }}>
        <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="48" cy="48" r="28" stroke="#1e8a8a" strokeWidth="3" fill="none" />
          <circle cx="48" cy="48" r="13" stroke="#1e8a8a" strokeWidth="2.5" fill="#050d18" />
          {[0,45,90,135,180,225,270,315].map((a, i) => {
            const r = (a*Math.PI)/180, x1=48+28*Math.cos(r), y1=48+28*Math.sin(r), x2=48+40*Math.cos(r), y2=48+40*Math.sin(r);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1e8a8a" strokeWidth="6" strokeLinecap="round" />;
          })}
        </svg>
      </div>

      {/* Gear small reverse */}
      <div className="absolute" style={{ right: "18%", top: "38%", animation: "spinSlowRev 7s linear infinite" }}>
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="26" cy="26" r="14" stroke="#3ecfcf" strokeWidth="2.2" fill="none" />
          <circle cx="26" cy="26" r="6"  stroke="#3ecfcf" strokeWidth="2" fill="#050d18" />
          {[0,60,120,180,240,300].map((a, i) => {
            const r=(a*Math.PI)/180, x1=26+14*Math.cos(r), y1=26+14*Math.sin(r), x2=26+22*Math.cos(r), y2=26+22*Math.sin(r);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#3ecfcf" strokeWidth="5" strokeLinecap="round" />;
          })}
        </svg>
      </div>

      {/* AI flow diagram */}
      <div className="absolute" style={{ right: "4%", top: "54%", animation: "floatMed 3.8s 0.8s ease-in-out infinite" }}>
        <svg width="196" height="116" viewBox="0 0 196 116" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="18"  cy="58" r="13" fill="#0a1a20" stroke="#1e8a8a" strokeWidth="1.5" />
          <circle cx="98"  cy="28" r="13" fill="#0a1a20" stroke="#3ecfcf" strokeWidth="1.5" />
          <circle cx="98"  cy="88" r="13" fill="#0a1a20" stroke="#3ecfcf" strokeWidth="1.5" />
          <circle cx="178" cy="58" r="13" fill="#0a1a20" stroke="#1e8a8a" strokeWidth="1.5" />
          <line x1="31" y1="53" x2="85" y2="33" stroke="#1e8a8a" strokeWidth="1.2" strokeDasharray="4 4" />
          <line x1="31" y1="63" x2="85" y2="83" stroke="#1e8a8a" strokeWidth="1.2" strokeDasharray="4 4" />
          <line x1="111" y1="33" x2="165" y2="53" stroke="#3ecfcf" strokeWidth="1.2" strokeDasharray="4 4" />
          <line x1="111" y1="83" x2="165" y2="63" stroke="#3ecfcf" strokeWidth="1.2" strokeDasharray="4 4" />
          <text x="12"  y="62" fontSize="10" fill="#1e8a8a">⚡</text>
          <text x="92"  y="32" fontSize="9"  fill="#3ecfcf">⚙</text>
          <text x="92"  y="92" fontSize="9"  fill="#3ecfcf">🤖</text>
          <text x="172" y="62" fontSize="10" fill="#1e8a8a">✓</text>
        </svg>
      </div>

      {/* Content */}
      <div className="absolute z-10 flex flex-col" style={{ left: "6%", top: "14%", maxWidth: 460 }}>
        <p style={{ fontSize: 11, letterSpacing: "0.18em", color: "#3ecfcf", marginBottom: 14, fontWeight: 600, textTransform: "uppercase" }}>
          // 02 — Automatisering
        </p>
        <h2 style={{ fontSize: "clamp(2rem,4vw,3.4rem)", fontWeight: 800, lineHeight: 1.1, color: "white", marginBottom: 16 }}>
          Intelligente{" "}
          <span style={{ background: "linear-gradient(135deg,#22d3ee,#34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            automatiseringer.
          </span>
        </h2>
        <p style={{ color: "#608080", fontSize: "clamp(0.9rem,1.6vw,1.05rem)", lineHeight: 1.7, marginBottom: 28 }}>
          Skær i det manuelle arbejde og skaler uden at ansætte.
          AI-agenter der rent faktisk udfører jobbet.
        </p>
        <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
          {["AI-drevne workflows", "CRM & værktøjsintegrationer", "Datapipelines", "Skræddersyede bots & agenter"].map((p) => (
            <li key={p} style={{ display: "flex", alignItems: "center", gap: 10, color: "#608888", fontSize: 14 }}>
              <span style={{ color: "#3ecfcf", fontSize: 16 }}>✦</span>
              {p}
            </li>
          ))}
        </ul>
      </div>

      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0" style={{ height: "14vh", background: "linear-gradient(to top,#03080e 0%,#060c14 60%,transparent 100%)" }} />
      <div className="absolute left-0 right-0" style={{ bottom: "14vh", height: 2, background: "linear-gradient(90deg,transparent,rgba(30,138,138,0.4),rgba(62,207,207,0.3),transparent)" }} />
    </div>
  );
}

/* ──────────────────────────────────────────────────────
   SCENE 4 — KONTAKT  (warm · form · Telegram)
   ────────────────────────────────────────────────────── */
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
    padding: "10px 14px",
    borderRadius: 7,
    border: "1px solid rgba(180,80,240,0.2)",
    background: "rgba(255,255,255,0.04)",
    color: "white",
    fontSize: 14,
    outline: "none",
  };

  const stars = Array.from({ length: 38 }, (_, i) => ({
    x: (i * 97.5) % 100, y: (i * 63.7) % 70,
    r: ((i % 3) + 1) * 0.5, delay: (i % 5) * 0.5, dur: 2.5 + (i % 3) * 0.7,
  }));

  return (
    <div
      className="relative flex-shrink-0 snap-start overflow-hidden"
      style={{ width: "100vw", height: "100vh", background: "linear-gradient(160deg,#080814 0%,#10081e 55%,#180620 100%)" }}
    >
      {/* Stars */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {stars.map((s, i) => (
          <circle key={i} cx={`${s.x}%`} cy={`${s.y}%`} r={s.r} fill="white"
            style={{ animation: `twinkle ${s.dur}s ${s.delay}s ease-in-out infinite` }} />
        ))}
        <ellipse cx="65%" cy="38%" rx="240" ry="140" fill="rgba(150,50,200,0.05)" />
      </svg>

      {/* Floating envelope */}
      <div className="absolute" style={{ right: "7%", top: "18%", animation: "floatSlow 5s ease-in-out infinite" }}>
        <svg width="138" height="98" viewBox="0 0 138 98" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="130" height="90" rx="10" fill="#130820" stroke="#3a1e50" strokeWidth="1.5" />
          <path d="M4,14 L69,56 L134,14" stroke="#5a2e80" strokeWidth="1.5" fill="none" />
          <path d="M4,94 L50,50" stroke="#3a1e50" strokeWidth="1" />
          <path d="M134,94 L88,50" stroke="#3a1e50" strokeWidth="1" />
          <circle cx="69" cy="48" r="16" fill="rgba(150,80,220,0.1)" />
          <path d="M59,43 L69,50 L79,43" stroke="#9050e0" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      {/* Decorative orbs */}
      <div className="absolute" style={{ left: "7%",  top: "66%", animation: "floatMed 3.5s 0.3s ease-in-out infinite" }}>
        <div style={{ width: 16, height: 16, borderRadius: "50%", background: "rgba(180,80,240,0.5)", boxShadow: "0 0 24px rgba(180,80,240,0.4)" }} />
      </div>
      <div className="absolute" style={{ left: "19%", top: "73%", animation: "floatMed 2.8s 0.9s ease-in-out infinite" }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(140,80,200,0.4)", boxShadow: "0 0 18px rgba(140,80,200,0.3)" }} />
      </div>

      {/* Content + Form */}
      <div className="absolute z-10 flex flex-col" style={{ left: "6%", top: "12%", maxWidth: 460 }}>
        <p style={{ fontSize: 11, letterSpacing: "0.18em", color: "#b080e8", marginBottom: 14, fontWeight: 600, textTransform: "uppercase" }}>
          // 03 — Kontakt
        </p>
        <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 800, lineHeight: 1.1, color: "white", marginBottom: 10 }}>
          Lad os bygge{" "}
          <span style={{ background: "linear-gradient(135deg,#c084fc,#f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            noget.
          </span>
        </h2>
        <p style={{ color: "#806880", fontSize: 14, lineHeight: 1.6, marginBottom: 18 }}>
          Fortæl mig hvad du arbejder på — jeg svarer inden for 24 timer.
        </p>

        {/* Phone number */}
        <a
          href="tel:+4531552108"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20, color: "#c084fc", fontSize: 15, fontWeight: 600, textDecoration: "none" }}
        >
          <span>📞</span>
          +45 31 55 21 08
        </a>

        {status === "sent" ? (
          <div style={{ padding: "20px 24px", borderRadius: 12, border: "1px solid rgba(180,80,240,0.3)", background: "rgba(180,80,240,0.08)", textAlign: "center" }}>
            <p style={{ color: "white", fontWeight: 700, marginBottom: 4 }}>Tak! 🎉</p>
            <p style={{ color: "#806880", fontSize: 13 }}>Jeg vender tilbage snarest.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div>
                <label style={{ display: "block", fontSize: 11, color: "#806880", marginBottom: 5 }}>Navn *</label>
                <input style={inputStyle} type="text" required placeholder="Dit navn"
                  value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11, color: "#806880", marginBottom: 5 }}>Telefon *</label>
                <input style={inputStyle} type="tel" required placeholder="Dit telefonnr."
                  value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11, color: "#806880", marginBottom: 5 }}>Virksomhed *</label>
              <input style={inputStyle} type="text" required placeholder="Din virksomhed"
                value={company} onChange={e => setCompany(e.target.value)} />
            </div>
            {status === "error" && (
              <p style={{ fontSize: 12, color: "#f87171" }}>Noget gik galt — prøv igen eller ring til mig.</p>
            )}
            <button
              type="submit"
              disabled={status === "sending"}
              style={{
                padding: "12px 24px",
                borderRadius: 8,
                background: "linear-gradient(135deg,#7c3aed,#a855f7)",
                color: "white",
                fontWeight: 700,
                fontSize: 14,
                border: "none",
                cursor: status === "sending" ? "not-allowed" : "pointer",
                opacity: status === "sending" ? 0.7 : 1,
                boxShadow: "0 0 28px rgba(124,58,237,0.3)",
                marginTop: 4,
              }}
            >
              {status === "sending" ? "Sender..." : "Send →"}
            </button>
          </form>
        )}
      </div>

      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0" style={{ height: "14vh", background: "linear-gradient(to top,#080814 0%,#0e0818 60%,transparent 100%)" }} />
      <div className="absolute left-0 right-0" style={{ bottom: "14vh", height: 2, background: "linear-gradient(90deg,transparent,rgba(150,50,200,0.3),rgba(200,80,240,0.2),transparent)" }} />
    </div>
  );
}

/* ──────────────────────────────────────────────────────
   MAIN PAGE
   ────────────────────────────────────────────────────── */
export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState(0);
  const [walking, setWalking] = useState(false);
  const walkTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scenes = [
    { label: "Hej",            color: "#7c6aec" },
    { label: "Hjemmesider",    color: "#4a9eff" },
    { label: "Automatisering", color: "#3ecfcf" },
    { label: "Kontakt",        color: "#c084fc" },
  ];

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const current = Math.round(containerRef.current.scrollLeft / window.innerWidth);
    setScene(Math.min(current, scenes.length - 1));
    setWalking(true);
    if (walkTimer.current) clearTimeout(walkTimer.current);
    walkTimer.current = setTimeout(() => setWalking(false), 300);
  }, [scenes.length]);

  const goTo = (i: number) => {
    containerRef.current?.scrollTo({ left: i * window.innerWidth, behavior: "smooth" });
  };

  return (
    <>
      {/* ── Top progress bar ── */}
      <div style={{ position: "fixed", top: 0, left: 0, height: 3, width: `${((scene) / (scenes.length - 1)) * 100}%`,
        background: `linear-gradient(90deg,${scenes[0].color},${scenes[scene].color})`,
        zIndex: 100, transition: "width 0.25s ease" }} />

      {/* ── Scene nav dots ── */}
      <div style={{ position: "fixed", right: 18, top: "50%", transform: "translateY(-50%)", zIndex: 100,
        display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
        {scenes.map((s, i) => (
          <button key={s.label} onClick={() => goTo(i)} title={s.label}
            style={{ width: scene === i ? 10 : 7, height: scene === i ? 10 : 7, borderRadius: "50%",
              background: scene === i ? s.color : "rgba(255,255,255,0.18)", border: "none",
              cursor: "pointer", transition: "all 0.3s ease",
              boxShadow: scene === i ? `0 0 10px ${s.color}80` : "none", padding: 0 }} />
        ))}
      </div>

      {/* ── Scene counter ── */}
      <div style={{ position: "fixed", bottom: 18, left: 22, zIndex: 100, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.22)", letterSpacing: "0.12em" }}>
          {(scene + 1).toString().padStart(2, "0")} / 04
        </span>
        <span style={{ fontSize: 11, color: scenes[scene].color, letterSpacing: "0.08em" }}>
          {scenes[scene].label.toUpperCase()}
        </span>
      </div>

      {/* ── Scroll hint (scene 0 only) ── */}
      {scene === 0 && (
        <div style={{ position: "fixed", bottom: 22, left: "50%", transform: "translateX(-50%)", zIndex: 100,
          display: "flex", alignItems: "center", gap: 6, animation: "floatMed 1.8s ease-in-out infinite" }}>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", letterSpacing: "0.1em" }}>SWIPE</span>
          <span style={{ fontSize: 18, color: "rgba(255,255,255,0.28)" }}>→</span>
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
          position: "relative",
        }}
      >
        <SceneHej />
        <SceneHjemmesider />
        <SceneAutomatisering />
        <SceneKontakt />
      </div>

      {/* ── Character — fixed on screen, stands on ground ── */}
      <div style={{ position: "fixed", bottom: "14vh", left: "46%", transform: "translateX(-50%)", zIndex: 30, pointerEvents: "none" }}>
        <MikkelCharacter walking={walking} />
      </div>
    </>
  );
}
