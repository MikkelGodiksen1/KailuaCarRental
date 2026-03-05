"use client";

import { useRef, useState, useCallback, useEffect } from "react";

/* ────────────────────────────────────────────────────────────
   MIKKEL CHARACTER
   scene 0: looking up (default)
   scene 1: pointing at laptop (excited)
   scene 2: WOW, both arms up, open mouth, "!!"
   scene 3: thumbs up + wink
   scene 4: call me 🤙, looking straight at viewer
   ──────────────────────────────────────────────────────────── */
function MikkelCharacter({ walking, scene = 0 }: { walking: boolean; scene?: number }) {
  const headRot = [-12,  -8, -20,  -4,  0][scene] ?? -12;
  const pupilCy = [ 26,  27,  23,  28, 30][scene] ?? 26;
  const browY   = scene === 2 ? 14 : 20;
  const eyeR    = scene === 2 ? 7  :  6;
  const pupilR  = scene === 2 ? 3.8 : 3.2;
  const wink    = scene === 3; // wink left eye (screen-right after flip)

  const mouthPath = [
    "M36,41 Q42,47 48,41",   // 0 slight smile
    "M34,40 Q42,50 50,40",   // 1 excited smile
    "",                       // 2 handled separately (open O)
    "M33,39 Q42,52 51,39",   // 3 big grin
    "M36,41 Q42,47 48,41",   // 4 warm smile
  ][scene] ?? "M36,41 Q42,47 48,41";

  return (
    <div
      className={walking ? "is-walking" : ""}
      style={{ width: 96, height: 154, transform: "scaleX(-1)", filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.25))" }}
    >
      <svg viewBox="0 0 84 136" xmlns="http://www.w3.org/2000/svg" overflow="visible">
        <ellipse cx="42" cy="134" rx="22" ry="4" fill="rgba(0,0,0,0.12)" />

        {/* Legs, tykkere */}
        <g className="char-leg-left">
          <rect x="18" y="92" width="20" height="38" rx="4" fill="#222244" />
          <ellipse cx="25" cy="130" rx="14" ry="6" fill="#111130" />
        </g>
        <g className="char-leg-right">
          <rect x="46" y="92" width="20" height="38" rx="4" fill="#222244" />
          <ellipse cx="59" cy="130" rx="14" ry="6" fill="#111130" />
        </g>

        {/* Body, bredere, mere robust */}
        <g className="char-body">
          <path d="M14,60 Q8,63 8,76 L8,92 Q8,98 20,98 L64,98 Q76,98 76,92 L76,76 Q76,63 70,60 Z" fill="#111111" />
          <rect x="26" y="50" width="32" height="20" rx="4" fill="#111111" />
          <rect x="28" y="50" width="28" height="12" rx="3" fill="#1a1a1a" />

          {/* Left arm (= screen-right after scaleX flip) */}
          <g className="char-arm-left">
            {scene === 4 ? (
              // KONTAKT: tykkere arm + telefon ved øret
              <>
                {/* Arm: tykkere, fra skulder til øret */}
                <path d="M 14,60 Q 6,64 2,60 Q 0,54 2,48 Q 4,38 10,32 Q 16,26 22,26 L 26,32 Q 20,38 14,44 Q 10,52 8,58 Q 12,62 14,60 Z" fill="#111111" />
                {/* Hånd ved øret */}
                <circle cx="18" cy="26" r="7" fill="#f3c49e" />
                {/* Telefon ved øret */}
                <rect x="10" y="12" width="10" height="22" rx="3" fill="#1a3a5c" />
                <rect x="11" y="14" width="8" height="18" fill="#2a2a4a" />
              </>
            ) : scene === 2 ? (
              // WOW: left arm raised high
              <>
                <path d="M14,61 Q5,52 2,40 Q0,30 5,24 L11,28 L18,58 Z" fill="#111111" />
                <circle cx="4" cy="22" r="7" fill="#f3c49e" />
              </>
            ) : scene === 1 ? (
              // Pointing toward laptop (upper-left in SVG = upper-right on screen)
              <>
                <path d="M14,61 Q8,55 4,45 Q1,35 5,27 L11,31 L18,58 Z" fill="#111111" />
                <circle cx="4" cy="25" r="7" fill="#f3c49e" />
              </>
            ) : scene === 3 ? (
              // Thumbs up
              <>
                <path d="M14,61 Q8,55 6,45 Q6,35 10,29 L16,33 L20,58 Z" fill="#111111" />
                <rect x="6"  y="27" width="13" height="10" rx="3"   fill="#f3c49e" />
                <rect x="7"  y="14" width="8"  height="15" rx="4"   fill="#f3c49e" />
              </>
            ) : (
              // Default: arm down
              <>
                <path d="M7,63 Q4,67 4,82 Q4,93 12,95 L18,93 L20,68 L14,61 Z" fill="#111111" />
                <circle cx="11" cy="96" r="7" fill="#f3c49e" />
              </>
            )}
          </g>

          {/* Right arm (= screen-left after scaleX flip) */}
          <g className="char-arm-right">
            {scene === 2 ? (
              // WOW: right arm raised high
              <>
                <path d="M70,61 Q79,52 82,40 Q84,30 79,24 L73,28 L66,58 Z" fill="#111111" />
                <circle cx="80" cy="22" r="7" fill="#f3c49e" />
              </>
            ) : (
              <>
                <path d="M77,63 Q80,67 80,82 Q80,93 72,95 L66,93 L64,68 L70,61 Z" fill="#111111" />
                <circle cx="73" cy="96" r="7" fill="#f3c49e" />
              </>
            )}
          </g>

          {/* Neck */}
          <rect x="32" y="48" width="20" height="14" rx="4" fill="#f3c49e" />

          {/* Head */}
          <g transform={`rotate(${headRot}, 42, 34)`}>
            <circle cx="42" cy="34" r="26" fill="#f3c49e" />
            <path d="M20,37 Q20,55 42,59 Q64,55 64,37" fill="#d4a860" />
            <path d="M23,40 Q23,52 42,56 Q61,52 61,40" fill="#e0bc76" />

            {/* Rosy cheeks */}
            <ellipse cx="26" cy="38" rx="7" ry="5" fill="#e8908a" opacity="0.35" />
            <ellipse cx="58" cy="38" rx="7" ry="5" fill="#e8908a" opacity="0.35" />

            {/* Beard - sideburns */}
            <path d="M16,38 Q13,50 16,60 Q19,58 19,48 Q19,42 21,38 Z" fill="#8B6530" />
            <path d="M68,38 Q71,50 68,60 Q65,58 65,48 Q65,42 63,38 Z" fill="#8B6530" />
            {/* Beard - full lower face */}
            <path d="M17,46 Q16,66 42,70 Q68,66 67,46 Q64,57 42,61 Q20,57 17,46 Z" fill="#8B6530" />
            <path d="M20,48 Q20,63 42,66 Q64,63 64,48 Q62,57 42,60 Q22,57 20,48 Z" fill="#a07840" />
            {/* Beard highlight */}
            <path d="M30,57 Q42,65 54,57" stroke="#c09040" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.4" />

            {/* Eyes: whites (kun venstre hvis ikke blink) */}
            {!wink && <circle cx="32" cy="30" r={eyeR} fill="white" />}
            <circle cx="52" cy="30" r={eyeR} fill="white" />

            {/* Left eye: lukket/blink på scene 3, ingen hvid synlig */}
            {wink ? (
              <>
                <ellipse cx="32" cy="30" rx="7" ry="4" fill="#f3c49e" />
                <path d="M26,30 Q32,27 38,30" stroke="#c8922a" strokeWidth="2" fill="none" strokeLinecap="round" />
              </>
            ) : (
              <>
                <circle cx="32" cy={pupilCy} r={pupilR}       fill="#3868c8" />
                <circle cx="32" cy={pupilCy} r={pupilR * 0.5} fill="#0a0e1a" />
                <circle cx="33" cy={pupilCy - 1} r="1.1"      fill="white" />
              </>
            )}

            {/* Right eye: altid synlig */}
            <circle cx="52" cy={pupilCy} r={pupilR}       fill="#3868c8" />
            <circle cx="52" cy={pupilCy} r={pupilR * 0.5} fill="#0a0e1a" />
            <circle cx="53" cy={pupilCy - 1} r="1.1"      fill="white" />

            {/* Eyebrows */}
            <path d={`M24,${browY} Q31,${browY - 5} 38,${browY}`} stroke="#8a6018" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d={`M46,${browY} Q53,${browY - 5} 60,${browY}`} stroke="#8a6018" strokeWidth="2.5" fill="none" strokeLinecap="round" />

            {/* Mouth */}
            {scene === 2 ? (
              <ellipse cx="42" cy="45" rx="5" ry="5" fill="#8a3a10" />
            ) : (
              <path d={mouthPath} stroke="#c06828" strokeWidth="2" fill="none" strokeLinecap="round" />
            )}

            {/* Hair */}
            <path d="M17,28 Q16,14 42,10 Q68,14 67,28 Q65,16 42,14 Q19,16 17,28 Z" fill="#c8922a" />
            <path d="M18,26 Q18,8 42,6 Q66,8 66,26 Q62,12 42,10 Q22,12 18,26 Z" fill="#d9a030" />
            <path d="M26,16 Q34,8 42,7 Q50,8 55,14" stroke="#f0c040" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.7" />
            <path d="M18,26 Q16,32 18,38 Q20,30 22,26" fill="#c8922a" />
            <path d="M66,26 Q68,32 66,38 Q64,30 62,26" fill="#c8922a" />
          </g>
        </g>

        {/* WOW reaction: pixel "!!" marks above head */}
        {scene === 2 && (
          <>
            <text x="57" y="16" fontFamily="'Press Start 2P', monospace" fontSize="15" fill="#f8c800">!</text>
            <text x="69" y="8"  fontFamily="'Press Start 2P', monospace" fontSize="10" fill="#e80010">!</text>
          </>
        )}
      </svg>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   PIXEL CLOUD  (bright, classic Mario style)
   ──────────────────────────────────────────────────────────── */
function PixelCloud({ style }: { style?: React.CSSProperties }) {
  return (
    <svg width="120" height="48" viewBox="0 0 120 48" xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: "pixelated", ...style }}>
      <rect x="16" y="24" width="88" height="24" fill="white" />
      <rect x="8"  y="16" width="104" height="24" fill="white" />
      <rect x="24" y="8"  width="72"  height="16" fill="white" />
      <rect x="40" y="0"  width="40"  height="12" fill="white" />
      {/* Outline shadow */}
      <rect x="16" y="46" width="88" height="4" fill="#c8c8c8" />
      <rect x="8"  y="38" width="4"  height="4" fill="#c8c8c8" />
      <rect x="108" y="38" width="4" height="4" fill="#c8c8c8" />
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────
   PIXEL GROUND  (Mario-green platform)
   ──────────────────────────────────────────────────────────── */
function PixelGround() {
  return (
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "11vh" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "#2a2a2a" }} />
      <div style={{ position: "absolute", top: 4, left: 0, right: 0, height: 8,  background: "#58d858" }} />
      <div style={{ position: "absolute", top: 12, left: 0, right: 0, height: 6, background: "#38b838" }} />
      <div style={{ position: "absolute", top: 18, left: 0, right: 0, bottom: 0, background: "#8B5e3c" }} />
      <div style={{ position: "absolute", top: 20, left: 0, right: 0, height: 2, background: "#7a5030" }} />
    </div>
  );
}

/* shared label style */
const labelStyle: React.CSSProperties = {
  fontFamily: "'Press Start 2P', monospace",
  fontSize: 11,
  letterSpacing: "0.08em",
  lineHeight: 1.6,
};

/* ────────────────────────────────────────────────────────────
   SCENE 1 HEJ
   ──────────────────────────────────────────────────────────── */
function SceneHej({ goTo }: { goTo: (i: number) => void }) {
  return (
    <div className="relative flex-shrink-0 overflow-hidden"
      style={{ width: "100vw", height: "100vh", background: "#d8eeff" }}>

      {/* Sky gradient */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #8ec8f8 0%, #d8eeff 60%)" }} />

      {/* Sun */}
      <div style={{ position: "absolute", right: "12%", top: "8%" }}>
        <svg width="72" height="72" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
          <rect x="28" y="0"  width="16" height="8"  fill="#f8c800" />
          <rect x="28" y="64" width="16" height="8"  fill="#f8c800" />
          <rect x="0"  y="28" width="8"  height="16" fill="#f8c800" />
          <rect x="64" y="28" width="8"  height="16" fill="#f8c800" />
          <rect x="8"  y="8"  width="8"  height="8"  fill="#f8c800" />
          <rect x="56" y="8"  width="8"  height="8"  fill="#f8c800" />
          <rect x="8"  y="56" width="8"  height="8"  fill="#f8c800" />
          <rect x="56" y="56" width="8"  height="8"  fill="#f8c800" />
          <rect x="16" y="16" width="40" height="40" fill="#f8e000" />
          <rect x="24" y="20" width="24" height="8"  fill="#fff8a0" opacity="0.6" />
        </svg>
      </div>

      {/* Clouds */}
      <PixelCloud style={{ position: "absolute", left: "10%", top: "10%", animation: "floatSlow 6s ease-in-out infinite" }} />
      <PixelCloud style={{ position: "absolute", right: "26%", top: "18%", width: 80, height: 32, animation: "floatSlow 8s 1s ease-in-out infinite", opacity: 0.8 }} />

      {/* Content: pushed high */}
      <div className="absolute z-10" style={{ left: "5%", top: "5%", maxWidth: 520 }}>

        {/* Badge */}
        <div className="scene-enter" style={{
          ...labelStyle,
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "7px 12px",
          background: "#e80010",
          color: "white",
          marginBottom: 12,
        }}>
          <span style={{ width: 8, height: 8, background: "white", display: "inline-block", animation: "blink 1s step-end infinite" }} />
          ÅBEN FOR PROJEKTER
        </div>

        <h1 className="scene-enter-d1" style={{
          fontSize: "clamp(2.6rem,5.5vw,4.8rem)", fontWeight: 900, lineHeight: 1.0,
          color: "#0a0820", marginBottom: 4, letterSpacing: "-0.02em",
        }}>
          Hej, jeg er
        </h1>
        <h1 className="scene-enter-d1" style={{
          fontSize: "clamp(2.6rem,5.5vw,4.8rem)", fontWeight: 900, lineHeight: 1.0,
          marginBottom: 14, letterSpacing: "-0.02em",
          color: "#e80010",
          textShadow: "4px 4px 0px rgba(180,0,0,0.3)",
        }}>
          Mikkel.
        </h1>

        <p className="scene-enter-d2" style={{
          fontSize: "clamp(0.95rem,1.7vw,1.1rem)", color: "#2a2848",
          lineHeight: 1.55, marginBottom: 14, maxWidth: 440,
        }}>
          Datamatiker. Uddannet coach (NLP). Født 97. Tidl. selvstændig forsikringsagent.
          I dag laver jeg <strong style={{ color: "#e80010" }}>LinkedIn</strong> og <strong style={{ color: "#1877F2" }}>Meta ads</strong> der konverterer,
          <strong style={{ color: "#0038c8" }}> automatiseringer</strong> der sparer timer
          og <strong style={{ color: "#38a830" }}>hjemmesider</strong> folk faktisk bruger.
        </p>

        <div className="scene-enter-d3" style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <button onClick={() => goTo(4)} className="cta-btn"
            style={{ ...labelStyle, padding: "10px 18px", background: "#e80010", color: "white", border: "none", cursor: "pointer", boxShadow: "4px 4px 0px #880008" }}>
            KOM I GANG
          </button>
          <button onClick={() => goTo(1)}
            style={{ ...labelStyle, background: "none", border: "3px solid #0a0820", cursor: "pointer", color: "#0a0820", padding: "8px 14px" }}>
            SE MERE ▶
          </button>
        </div>
      </div>

      <PixelGround />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   SCENE 2 HJEMMESIDER
   ──────────────────────────────────────────────────────────── */
function SceneHjemmesider({ goTo }: { goTo: (i: number) => void }) {
  return (
    <div className="relative flex-shrink-0 overflow-hidden"
      style={{ width: "100vw", height: "100vh", background: "#e8f0ff" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #b8d0f8 0%, #e8f0ff 60%)" }} />

      <PixelCloud style={{ position: "absolute", right: "8%", top: "8%", animation: "floatSlow 5s ease-in-out infinite" }} />
      <PixelCloud style={{ position: "absolute", left: "20%", top: "15%", width: 90, height: 36, animation: "floatSlow 7s 2s ease-in-out infinite", opacity: 0.7 }} />

      {/* Pixel laptop: top right */}
      <div style={{ position: "absolute", right: "4%", top: "8%", animation: "floatMed 4s ease-in-out infinite" }}>
        <svg width="220" height="150" viewBox="0 0 220 150" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
          <rect x="10" y="0" width="200" height="118" fill="#0a0820" rx="0" />
          <rect x="10" y="0" width="200" height="118" stroke="#0a0820" strokeWidth="4" fill="none" />
          <rect x="18" y="8" width="184" height="100" fill="#f8f8f8" />
          {/* Browser bar */}
          <rect x="18" y="8"  width="184" height="18" fill="#e8e8e8" />
          <rect x="22" y="12" width="8"   height="8"  fill="#e80010" />
          <rect x="34" y="12" width="8"   height="8"  fill="#f8c800" />
          <rect x="46" y="12" width="8"   height="8"  fill="#38b838" />
          <rect x="60" y="12" width="100" height="8"  fill="white" />
          {/* Content lines */}
          <rect x="24" y="34" width="100" height="10" fill="#0038c8" opacity="0.8" />
          <rect x="24" y="50" width="160" height="6"  fill="#0a0820" opacity="0.3" />
          <rect x="24" y="62" width="140" height="6"  fill="#0a0820" opacity="0.3" />
          <rect x="24" y="74" width="80"  height="20" fill="#e80010" />
          <rect x="112" y="74" width="70" height="20" fill="#e8e8e8" stroke="#ccc" strokeWidth="1" />
          {/* Base */}
          <path d="M0 118 L220 118 L210 138 L10 138 Z" fill="#111111" />
          <rect x="80" y="114" width="60" height="6" fill="#222" />
        </svg>
      </div>

      {/* Content */}
      <div className="absolute z-10" style={{ left: "5%", top: "5%", maxWidth: 480 }}>
        <p className="scene-enter" style={{ ...labelStyle, color: "#0038c8", marginBottom: 10, fontSize: 10 }}>
          ▶ LEVEL 01 HJEMMESIDER
        </p>
        <h2 className="scene-enter-d1" style={{
          fontSize: "clamp(2.2rem,4.5vw,3.8rem)", fontWeight: 900, lineHeight: 1.0,
          color: "#0a0820", marginBottom: 4, letterSpacing: "-0.02em",
        }}>
          Skarpe
        </h2>
        <h2 className="scene-enter-d1" style={{
          fontSize: "clamp(2.2rem,4.5vw,3.8rem)", fontWeight: 900, lineHeight: 1.0,
          marginBottom: 12, letterSpacing: "-0.02em",
          color: "#0038c8", textShadow: "4px 4px 0px rgba(0,30,150,0.2)",
        }}>
          hjemmesider.
        </h2>
        <p className="scene-enter-d2" style={{
          color: "#2a2848", fontSize: "clamp(0.9rem,1.5vw,1.05rem)", lineHeight: 1.5, marginBottom: 12, maxWidth: 400,
        }}>
          Ingen tunge CMS-systemer. Ingen måneder i venteposition.
          Hurtig, skarp hjemmeside klar inden for få uger.
        </p>
        <ul className="scene-enter-d2" style={{ listStyle: "none", padding: 0, marginBottom: 12, display: "flex", flexDirection: "column", gap: 5 }}>
          {["Next.js + Tailwind CSS", "Mobilvenlig & tilgængelig", "SEO-optimeret fra dag ét", "Hostet gratis på Vercel"].map(p => (
            <li key={p} style={{ display: "flex", alignItems: "center", gap: 8, color: "#3a3860", fontSize: 13, fontWeight: 500 }}>
              <span style={{ width: 10, height: 10, background: "#0038c8", display: "inline-block", flexShrink: 0 }} />
              {p}
            </li>
          ))}
        </ul>
        <div className="scene-enter-d3">
          <button onClick={() => goTo(4)} className="cta-btn"
            style={{ ...labelStyle, padding: "10px 16px", background: "#0038c8", color: "white", border: "none", cursor: "pointer", boxShadow: "4px 4px 0px #001870" }}>
            KONTAKT MIG ▶
          </button>
        </div>
      </div>

      <PixelGround />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   SCENE 3 AUTOMATISERING
   ──────────────────────────────────────────────────────────── */
function SceneAutomatisering({ goTo }: { goTo: (i: number) => void }) {
  return (
    <div className="relative flex-shrink-0 overflow-hidden"
      style={{ width: "100vw", height: "100vh", background: "#e0f5e8" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #a8e0c0 0%, #e0f5e8 60%)" }} />

      <PixelCloud style={{ position: "absolute", left: "5%", top: "6%", animation: "floatSlow 7s ease-in-out infinite" }} />
      <PixelCloud style={{ position: "absolute", right: "20%", top: "14%", width: 80, animation: "floatSlow 5s 1.5s ease-in-out infinite", opacity: 0.7 }} />

      {/* Pixel terminal */}
      <div style={{ position: "absolute", right: "4%", top: "14%", animation: "floatMed 5s ease-in-out infinite", zIndex: 5 }}>
        <svg width="220" height="160" viewBox="0 0 220 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
          <rect x="0" y="0" width="220" height="140" fill="#0a1a10" stroke="#0a0820" strokeWidth="4" />
          <rect x="8" y="8" width="204" height="124" fill="#001808" />
          {/* Terminal lines */}
          <rect x="16" y="18" width="12" height="8" fill="#38d838" />
          <rect x="32" y="18" width="80" height="8" fill="#38d838" opacity="0.9" />
          <rect x="16" y="32" width="12" height="8" fill="#38d838" opacity="0.5" />
          <rect x="32" y="32" width="110" height="8" fill="#a8f8a8" opacity="0.7" />
          <rect x="16" y="46" width="12" height="8" fill="#38d838" opacity="0.5" />
          <rect x="32" y="46" width="60" height="8" fill="#f8e800" opacity="0.8" />
          <rect x="16" y="60" width="12" height="8" fill="#38d838" opacity="0.5" />
          <rect x="32" y="60" width="90" height="8" fill="#38d838" opacity="0.6" />
          <rect x="16" y="74" width="12" height="8" fill="#38d838" opacity="0.5" />
          <rect x="32" y="74" width="50" height="8" fill="#a8f8a8" opacity="0.9" />
          {/* Blinking cursor */}
          <rect x="86" y="74" width="10" height="8" fill="#38d838" style={{ animation: "blink 1s step-end infinite" }} />
          {/* Stand */}
          <rect x="88" y="140" width="44" height="12" fill="#0a1a10" stroke="#0a0820" strokeWidth="3" />
          <rect x="64" y="150" width="92" height="10" fill="#0a1a10" stroke="#0a0820" strokeWidth="3" />
        </svg>
      </div>

      {/* Spinning pixel gear */}
      <div style={{ position: "absolute", right: "6%", top: "60%", animation: "spinSlow 7s linear infinite" }}>
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
          <rect x="16" y="0"  width="24" height="8"  fill="#0a0820" />
          <rect x="16" y="48" width="24" height="8"  fill="#0a0820" />
          <rect x="0"  y="16" width="8"  height="24" fill="#0a0820" />
          <rect x="48" y="16" width="8"  height="24" fill="#0a0820" />
          <rect x="8"  y="8"  width="8"  height="8"  fill="#0a0820" />
          <rect x="40" y="8"  width="8"  height="8"  fill="#0a0820" />
          <rect x="8"  y="40" width="8"  height="8"  fill="#0a0820" />
          <rect x="40" y="40" width="8"  height="8"  fill="#0a0820" />
          <rect x="8"  y="8"  width="40" height="40" fill="#0a0820" />
          <rect x="16" y="16" width="24" height="24" fill="#e0f5e8" />
          <rect x="22" y="22" width="12" height="12" fill="#0a0820" />
        </svg>
      </div>

      {/* Content: kompakt */}
      <div className="absolute z-20" style={{ left: "5%", top: "5%", maxWidth: "min(480px, 58vw)" }}>
        <p className="scene-enter" style={{ ...labelStyle, color: "#008030", marginBottom: 8, fontSize: 10 }}>
          ▶ LEVEL 02 AUTOMATISERING
        </p>
        <h2 className="scene-enter-d1" style={{
          fontSize: "clamp(1.9rem,4vw,3.4rem)", fontWeight: 900, lineHeight: 1.0,
          color: "#0a0820", marginBottom: 2, letterSpacing: "-0.02em",
        }}>
          Intelligente
        </h2>
        <h2 className="scene-enter-d1" style={{
          fontSize: "clamp(1.9rem,4vw,3.4rem)", fontWeight: 900, lineHeight: 1.0,
          marginBottom: 6, letterSpacing: "-0.02em",
          color: "#008030", textShadow: "4px 4px 0px rgba(0,80,30,0.2)",
        }}>
          automatiseringer.
        </h2>
        <p className="scene-enter-d2" style={{
          color: "#0a1820", fontSize: "clamp(0.9rem,1.5vw,1.05rem)", lineHeight: 1.5, marginBottom: 6, maxWidth: 400, fontWeight: 500,
        }}>
          Har du opgaver der gentages igen og igen? Dem løser vi én gang, og så kører det selv.
        </p>
        <p className="scene-enter-d2" style={{ ...labelStyle, fontSize: 8, color: "#008030", marginBottom: 2 }}>GoHighLevel</p>
        <p className="scene-enter-d2" style={{ color: "#1a3020", fontSize: 11, marginBottom: 6, maxWidth: 420 }}>Kan bl.a.: CRM, workflows, funnels, pipelines, kalender, 500+ integrationer</p>
        <div className="scene-enter-d2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 8, fontSize: 12 }}>
          <div style={{ background: "#1a3020", color: "#c0c0c0", padding: 6, border: "2px solid #0a0820", fontFamily: "Inter, sans-serif" }}>
            <p style={{ ...labelStyle, fontSize: 7, marginBottom: 3, color: "#aaa" }}>GoHighLevel</p>
            <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 4, color: "#ddd", textDecoration: "line-through" }}>$97/md</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: 1.4, fontSize: 11 }}>
              <li>3 Sub-Accounts</li>
              <li>Unlimited contacts</li>
              <li>Ingen opsætning</li>
            </ul>
          </div>
          <div style={{ background: "#008030", color: "white", padding: 6, border: "2px solid #004018", fontFamily: "Inter, sans-serif" }}>
            <p style={{ ...labelStyle, fontSize: 7, marginBottom: 3, opacity: 0.95 }}>HOS MIG</p>
            <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>100 kr/md</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: 1.4, fontSize: 11 }}>
              <li>✓ Samme platform og features</li>
              <li>✓ + Template inkluderet</li>
              <li>✓ + Opsætning inkluderet</li>
            </ul>
          </div>
        </div>
        <ul className="scene-enter-d2" style={{ listStyle: "none", padding: 0, marginBottom: 10, display: "flex", flexDirection: "column", gap: 4 }}>
          {["AI-drevne workflows", "CRM & systemintegrationer", "Automatiske datapipelines", "Bots & agenter der virker"].map(p => (
            <li key={p} style={{ display: "flex", alignItems: "center", gap: 6, color: "#0a1820", fontSize: 13, fontWeight: 500 }}>
              <span style={{ width: 10, height: 10, background: "#008030", display: "inline-block", flexShrink: 0 }} />
              {p}
            </li>
          ))}
        </ul>
        <div className="scene-enter-d3">
          <button onClick={() => goTo(4)} className="cta-btn"
            style={{ ...labelStyle, padding: "10px 16px", background: "#008030", color: "white", border: "none", cursor: "pointer", boxShadow: "4px 4px 0px #004018" }}>
            KONTAKT MIG ▶
          </button>
        </div>
      </div>

      <PixelGround />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   SCENE 4 MARKEDSFØRING
   ──────────────────────────────────────────────────────────── */
function SceneMarkedsforing({ goTo }: { goTo: (i: number) => void }) {
  return (
    <div className="relative flex-shrink-0 overflow-hidden"
      style={{ width: "100vw", height: "100vh", background: "#f0ebff" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #c8b8f8 0%, #f0ebff 60%)" }} />

      <PixelCloud style={{ position: "absolute", left: "6%", top: "6%", animation: "floatSlow 6s ease-in-out infinite" }} />
      <PixelCloud style={{ position: "absolute", right: "18%", top: "16%", width: 80, animation: "floatSlow 8s 1s ease-in-out infinite", opacity: 0.7 }} />

      {/* LinkedIn pixel card */}
      <div style={{ position: "absolute", right: "4%", top: "8%", animation: "floatMed 4.5s ease-in-out infinite", zIndex: 5 }}>
        <svg width="210" height="130" viewBox="0 0 210 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
          {/* Card background */}
          <rect x="0" y="0" width="210" height="130" fill="#0A66C2" rx="0" />
          <rect x="4" y="4" width="202" height="122" fill="#0855a4" />
          {/* "in" logo */}
          <rect x="12" y="12" width="28" height="28" fill="white" />
          <rect x="16" y="18" width="6" height="16" fill="#0A66C2" />
          <rect x="16" y="16" width="6" height="5" fill="#0A66C2" />
          <rect x="25" y="22" width="6" height="12" fill="#0A66C2" />
          <rect x="23" y="20" width="10" height="5" fill="#0A66C2" />
          {/* Profile line */}
          <rect x="48" y="14" width="100" height="8" fill="white" opacity="0.9" />
          <rect x="48" y="26" width="70" height="6" fill="white" opacity="0.5" />
          {/* Content lines */}
          <rect x="12" y="52" width="160" height="6" fill="white" opacity="0.7" />
          <rect x="12" y="63" width="140" height="6" fill="white" opacity="0.5" />
          <rect x="12" y="74" width="120" height="6" fill="white" opacity="0.5" />
          {/* Sponsored tag */}
          <rect x="12" y="90" width="60" height="14" fill="#38c878" />
          <rect x="14" y="93" width="56" height="8" fill="#38c878" />
          {/* CTA button */}
          <rect x="130" y="88" width="68" height="18" fill="white" />
          <rect x="134" y="92" width="60" height="10" fill="#0A66C2" opacity="0.7" />
          {/* Stats bar */}
          <rect x="12" y="114" width="40" height="6" fill="white" opacity="0.4" />
          <rect x="60" y="114" width="40" height="6" fill="white" opacity="0.4" />
        </svg>
      </div>

      {/* Meta pixel card */}
      <div style={{ position: "absolute", right: "6%", top: "52%", animation: "floatMed 5.5s 0.8s ease-in-out infinite", zIndex: 5 }}>
        <svg width="190" height="110" viewBox="0 0 190 110" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
          {/* Card background */}
          <rect x="0" y="0" width="190" height="110" fill="#1877F2" />
          <rect x="4" y="4" width="182" height="102" fill="#1464d0" />
          {/* "f" logo */}
          <rect x="12" y="12" width="24" height="24" fill="#1877F2" />
          <rect x="14" y="10" width="20" height="28" fill="white" />
          <rect x="14" y="10" width="20" height="8" fill="#1877F2" />
          <rect x="14" y="21" width="14" height="4" fill="#1877F2" />
          <rect x="16" y="12" width="12" height="6" fill="white" />
          {/* Profile line */}
          <rect x="44" y="14" width="90" height="8" fill="white" opacity="0.9" />
          <rect x="44" y="26" width="60" height="6" fill="white" opacity="0.5" />
          {/* Image placeholder */}
          <rect x="12" y="46" width="166" height="40" fill="#1055b0" />
          <rect x="70" y="54" width="50" height="24" fill="white" opacity="0.2" />
          {/* Reactions */}
          <rect x="12" y="92" width="12" height="10" fill="#e80010" opacity="0.8" />
          <rect x="28" y="92" width="12" height="10" fill="#f8c800" opacity="0.8" />
          <rect x="50" y="93" width="50" height="7" fill="white" opacity="0.4" />
        </svg>
      </div>

      {/* Content: kompakt */}
      <div className="absolute z-20" style={{ left: "5%", top: "5%", maxWidth: "min(480px, 58vw)" }}>
        <p className="scene-enter" style={{ ...labelStyle, color: "#6020c8", marginBottom: 6, fontSize: 10 }}>
          ▶ LEVEL 03 MARKEDSFØRING
        </p>
        <h2 className="scene-enter-d1" style={{
          fontSize: "clamp(1.9rem,4vw,3.4rem)", fontWeight: 900, lineHeight: 1.0,
          color: "#0a0820", marginBottom: 2, letterSpacing: "-0.02em",
        }}>
          Annoncer der
        </h2>
        <h2 className="scene-enter-d1" style={{
          fontSize: "clamp(1.9rem,4vw,3.4rem)", fontWeight: 900, lineHeight: 1.0,
          marginBottom: 8, letterSpacing: "-0.02em",
          color: "#6020c8", textShadow: "4px 4px 0px rgba(80,20,160,0.2)",
        }}>
          konverterer.
        </h2>
        <p className="scene-enter-d2" style={{
          color: "#2a1848", fontSize: "clamp(0.85rem,1.4vw,1rem)", lineHeight: 1.45, marginBottom: 8, maxWidth: 400,
        }}>
          Få flere kunder med målrettede annoncer på LinkedIn og Meta.
          Vi opsætter, tester og optimerer. Du ser resultater.
        </p>

        <div className="scene-enter-d2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px", marginBottom: 10 }}>
          {/* LinkedIn */}
          <div>
            <p style={{ ...labelStyle, fontSize: 7, color: "#0A66C2", marginBottom: 3 }}>LINKEDIN ADS</p>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 2 }}>
              {["B2B-målretning på beslutningstagere", "Sponsored Content & Lead Gen", "Retargeting af besøgende"].map(p => (
                <li key={p} style={{ display: "flex", alignItems: "center", gap: 6, color: "#1a1040", fontSize: 12, fontWeight: 500 }}>
                  <span style={{ width: 10, height: 10, background: "#0A66C2", display: "inline-block", flexShrink: 0 }} />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          {/* Meta */}
          <div>
            <p style={{ ...labelStyle, fontSize: 7, color: "#1877F2", marginBottom: 3 }}>META ADS</p>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 2 }}>
              {["Facebook & Instagram annoncer", "Lookalike audiences", "A/B-test af kreativt"].map(p => (
                <li key={p} style={{ display: "flex", alignItems: "center", gap: 6, color: "#1a1040", fontSize: 12, fontWeight: 500 }}>
                  <span style={{ width: 10, height: 10, background: "#1877F2", display: "inline-block", flexShrink: 0 }} />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="scene-enter-d3">
          <button onClick={() => goTo(4)} className="cta-btn"
            style={{ ...labelStyle, padding: "10px 16px", background: "#6020c8", color: "white", border: "none", cursor: "pointer", boxShadow: "4px 4px 0px #300870" }}>
            KONTAKT MIG ▶
          </button>
        </div>
      </div>

      <PixelGround />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   SCENE 5 KONTAKT
   ──────────────────────────────────────────────────────────── */
function SceneKontakt() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, website, message }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Noget gik galt");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Kunne ikke oprette forbindelse");
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "clamp(8px, 2vw, 11px) clamp(10px, 2.5vw, 14px)",
    border: "3px solid #0a0820",
    background: "white", color: "#0a0820",
    fontSize: "clamp(13px, 2.2vw, 15px)", outline: "none",
    fontFamily: "Inter, sans-serif",
    boxSizing: "border-box",
  };

  return (
    <div className="relative flex-shrink-0 overflow-hidden"
      style={{ width: "100vw", height: "100vh", background: "#fff8e8" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #f8e8b8 0%, #fff8e8 60%)" }} />

      <PixelCloud style={{ position: "absolute", right: "10%", top: "8%", animation: "floatSlow 6s ease-in-out infinite" }} />

      {/* Pixel envelope */}
      <div style={{ position: "absolute", right: "4%", top: "10%", animation: "floatMed 4s ease-in-out infinite" }}>
        <svg width="200" height="140" viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
          <rect x="0" y="16" width="200" height="124" fill="#f8e800" stroke="#0a0820" strokeWidth="4" />
          <path d="M0,16 L100,72 L200,16" stroke="#0a0820" strokeWidth="4" fill="none" />
          <line x1="0" y1="140" x2="72" y2="72" stroke="#c8b800" strokeWidth="3" />
          <line x1="200" y1="140" x2="128" y2="72" stroke="#c8b800" strokeWidth="3" />
          <rect x="82" y="100" width="36" height="8" fill="#e80010" />
          <rect x="74" y="108" width="52" height="8" fill="#e80010" />
          <rect x="82" y="116" width="36" height="8" fill="#e80010" />
        </svg>
      </div>

      {/* Content */}
      <div className="absolute z-10" style={{ left: "5%", top: "5%", maxWidth: "min(480px, 90vw)" }}>
        <p className="scene-enter" style={{ ...labelStyle, color: "#c08000", marginBottom: 10, fontSize: 10 }}>
          ▶ LEVEL 04 KONTAKT
        </p>
        <h2 className="scene-enter-d1" style={{
          fontSize: "clamp(2.2rem,4.5vw,3.8rem)", fontWeight: 900, lineHeight: 1.0,
          color: "#0a0820", marginBottom: 4, letterSpacing: "-0.02em",
        }}>
          Tag fat i
        </h2>
        <h2 className="scene-enter-d1" style={{
          fontSize: "clamp(2.2rem,4.5vw,3.8rem)", fontWeight: 900, lineHeight: 1.0,
          marginBottom: 10, letterSpacing: "-0.02em",
          color: "#c08000", textShadow: "4px 4px 0px rgba(150,100,0,0.2)",
        }}>
          mig.
        </h2>
        <a href="tel:+4531552108" className="scene-enter-d1"
          style={{ ...labelStyle, display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 12, color: "#0a0820", textDecoration: "none", padding: "9px 14px", border: "3px solid #0a0820", background: "white", fontSize: 10 }}>
          ☎ +45 31 55 21 08
        </a>

        {status === "sent" ? (
          <div style={{ padding: "14px 18px", border: "4px solid #008030", background: "white", textAlign: "center" }}>
            <p style={{ ...labelStyle, color: "#008030", marginBottom: 4, fontSize: 9 }}>BESKED SENDT!</p>
            <p style={{ color: "#1a3020", fontSize: 15 }}>Jeg vender tilbage hurtigst muligt.</p>
          </div>
        ) : (
          <form className="scene-enter-d2" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "clamp(8px, 1.5vw, 10px)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(8px, 2vw, 12px)" }}>
              <div>
                <label style={{ ...labelStyle, display: "block", fontSize: "clamp(8px, 1.8vw, 10px)", color: "#6a5820", marginBottom: 4 }}>NAVN *</label>
                <input style={inputStyle} type="text" required placeholder="Dit navn" value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div>
                <label style={{ ...labelStyle, display: "block", fontSize: "clamp(8px, 1.8vw, 10px)", color: "#6a5820", marginBottom: 4 }}>TELEFON *</label>
                <input style={inputStyle} type="tel" required placeholder="Dit nr." value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
            </div>
            <div>
              <label style={{ ...labelStyle, display: "block", fontSize: "clamp(8px, 1.8vw, 10px)", color: "#6a5820", marginBottom: 4 }}>HJEMMESIDE *</label>
              <input style={inputStyle} type="text" required placeholder="Din hjemmeside (fx godik.dk)" value={website} onChange={e => setWebsite(e.target.value)} />
            </div>
            <div>
              <label style={{ ...labelStyle, display: "block", fontSize: "clamp(8px, 1.8vw, 10px)", color: "#6a5820", marginBottom: 4 }}>BESKED</label>
              <textarea style={{ ...inputStyle, minHeight: "clamp(70px, 12vw, 100px)", resize: "vertical" }} placeholder="Din besked..." value={message} onChange={e => setMessage(e.target.value)} />
            </div>
            {status === "error" && (
              <p style={{ ...labelStyle, fontSize: "clamp(8px, 1.8vw, 10px)", color: "#e80010" }}>FEJL. {errorMsg || "Prøv igen."}</p>
            )}
            <button type="submit" disabled={status === "sending"} className="cta-btn"
              style={{ ...labelStyle, padding: "clamp(9px, 2vw, 11px) clamp(14px, 3vw, 20px)", fontSize: "clamp(8px, 1.8vw, 10px)", background: status === "sending" ? "#a08000" : "#c08000", color: "white", border: "none", cursor: status === "sending" ? "not-allowed" : "pointer", boxShadow: status === "sending" ? "none" : "4px 4px 0px #604000", marginTop: 2 }}>
              {status === "sending" ? "SENDER..." : "SEND BESKED ▶"}
            </button>
          </form>
        )}
      </div>

      <PixelGround />
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
    { label: "HEJ",             color: "#e80010" },
    { label: "HJEMMESIDER",     color: "#0038c8" },
    { label: "AUTOMATISERING",  color: "#008030" },
    { label: "MARKEDSFØRING",   color: "#6020c8" },
    { label: "KONTAKT",         color: "#c08000" },
  ];

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const current = Math.round(containerRef.current.scrollLeft / window.innerWidth);
    setScene(Math.min(current, scenes.length - 1));
    setWalking(true);
    if (walkTimer.current) clearTimeout(walkTimer.current);
    walkTimer.current = setTimeout(() => setWalking(false), 350);
  }, [scenes.length]);

  const goTo = useCallback((i: number) => {
    const target = Math.max(0, Math.min(i, scenes.length - 1));
    containerRef.current?.scrollTo({ left: target * window.innerWidth, behavior: "smooth" });
  }, [scenes.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "d") {
        setScene(prev => { const n = Math.min(prev + 1, scenes.length - 1); goTo(n); return prev; });
      }
      if (e.key === "ArrowLeft" || e.key === "a") {
        setScene(prev => { const n = Math.max(prev - 1, 0); goTo(n); return prev; });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, scenes.length]);

  return (
    <>
      {/* Scanlines: subtle on light bg */}
      <div className="scanline-overlay" style={{ opacity: 0.4 }} />

      {/* Top pixel progress bar */}
      <div style={{
        position: "fixed", top: 0, left: 0, height: 6,
        width: `${(scene / (scenes.length - 1)) * 100}%`,
        background: scenes[scene].color,
        zIndex: 100,
        transition: "width 0.2s steps(16, end)",
      }} />

      {/* HUD: top right */}
      <div style={{
        position: "fixed", top: 14, right: 18, zIndex: 100,
        display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4,
        maxWidth: "45vw",
      }}>
        <span style={{ ...labelStyle, fontSize: 8, color: "rgba(0,0,0,0.3)" }}>
          {(scene + 1).toString().padStart(2, "0")} / 05
        </span>
        <span style={{ ...labelStyle, fontSize: 8, color: scenes[scene].color, textAlign: "right", lineHeight: 1.4 }}>
          {scenes[scene].label}
        </span>
      </div>

      {/* Bottom dot nav */}
      <div style={{
        position: "fixed", bottom: 18, left: "50%", transform: "translateX(-50%)",
        zIndex: 100, display: "flex", gap: 14, alignItems: "center",
      }}>
        {scenes.map((s, i) => (
          <button key={s.label} onClick={() => goTo(i)} title={s.label}
            style={{
              width: scene === i ? 16 : 10,
              height: scene === i ? 16 : 10,
              background: scene === i ? s.color : "rgba(0,0,0,0.15)",
              border: `3px solid ${scene === i ? s.color : "rgba(0,0,0,0.2)"}`,
              cursor: "pointer", padding: 0,
              boxShadow: scene === i ? `3px 3px 0px rgba(0,0,0,0.3)` : "none",
            }} />
        ))}
      </div>

      {/* Scroll hint */}
      {scene === 0 && (
        <div style={{
          ...labelStyle,
          position: "fixed", bottom: 20, right: 18, zIndex: 100,
          fontSize: 8, color: "rgba(0,0,0,0.25)",
          animation: "floatMed 1.8s ease-in-out infinite",
        }}>
          ▶ SCROLL
        </div>
      )}

      {/* Scroll container */}
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
        <SceneMarkedsforing goTo={goTo} />
        <SceneKontakt />
      </div>

      {/* Mikkel: faces right, looks up at text */}
      <div style={{
        position: "fixed",
        bottom: "11vh",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 30,
        pointerEvents: "none",
      }}>
        <MikkelCharacter walking={walking} scene={scene} />
      </div>
    </>
  );
}
