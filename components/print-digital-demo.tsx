"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Download, Globe, UserRound, Mail, MessageCircle, Phone, RotateCcw, ScanLine } from "lucide-react";
import { Logo } from "@/components/logo";
import styles from "./print-digital-demo.module.css";

const live = "https://farzeel.funoonprintco.com/";
const enquiry = "/quote?service=Employee%20business%20cards%20%2B%20digital%20e-cards";
const actions = [
  { label: "WhatsApp", caption: "Start a conversation", href: "https://wa.me/971541707274", icon: MessageCircle },
  { label: "Call", caption: "+971 54 170 7274", href: "tel:+971541707274", icon: Phone },
  { label: "Email", caption: "farzeel@funoonfzc.com", href: "mailto:farzeel@funoonfzc.com", icon: Mail },
  { label: "LinkedIn", caption: "View Farzeel’s profile", href: "https://www.linkedin.com/in/farzeel-fazir/", icon: UserRound },
  { label: "Visit Website", caption: "Explore Funoon FZC", href: "https://funoonprintco.com/", icon: Globe },
];

// Exact six-bar geometry from the existing live e-card's original SVG symbol.
function Mark() {
  return <svg className={styles.mark} viewBox="0 0 108 72" aria-hidden="true">
    {[0, 19, 38, 57, 76, 95].map((x, i) => <rect key={x} x={x} width="11" height="72" rx="5.5" style={{ animationDelay: `${i * 60}ms` }} />)}
  </svg>;
}

export function PrintDigitalDemo() {
  const [phase, setPhase] = useState<"intro" | "scan" | "card">("intro");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const preview = useRef<HTMLDivElement>(null);
  const cardHeading = useRef<HTMLHeadingElement>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  useEffect(() => { if (phase === "card") cardHeading.current?.focus({ preventScroll: true }); }, [phase]);
  function start(keyboard = false) {
    if (timer.current) clearTimeout(timer.current);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    preview.current?.scrollIntoView({ behavior: reduced || keyboard ? "instant" : "smooth", block: "center" });
    if (reduced || keyboard) { setPhase("card"); return; }
    setPhase("scan");
    timer.current = setTimeout(() => setPhase("card"), 850);
  }
  function replay() {
    if (timer.current) clearTimeout(timer.current);
    setPhase("intro");
  }
  return <>
    <section className={`${styles.demo} shell`} aria-labelledby="digital-title">
      <header className={styles.intro}>
        <p className={styles.eyebrow}>PRINT MEETS DIGITAL</p>
        <h1 id="digital-title">One card.<br />A simpler connection.</h1>
        <p className={styles.description}>Turn a first meeting into an easy follow-up. A printed card connects directly to your employee’s digital contact card.</p>
        <p className={styles.support}>A dedicated link and QR code for every employee.</p>
      </header>
      <div className={styles.stage}>
        <div className={styles.printSide}>
          <p className={styles.stageLabel}>THE PRINTED INTRODUCTION</p>
          <div className={styles.printCard}>
            <Logo className={styles.printLogo} />
            <div className={styles.printName}><strong>Farzeel Fazir</strong><span>CEO &amp; Head of Operations</span><span>Funoon FZC</span></div>
            <div className={styles.printBottom}>
              <div className={styles.printDetails}><span>+971 54 170 7274</span><span>farzeel@funoonfzc.com</span><span>funoonprintco.com</span></div>
              <button className={styles.qr} onClick={(e) => start(e.detail === 0)} aria-label="Try the simulated QR scan for Farzeel’s e-card" disabled={phase === "scan"}>
                <img src="/ecard/farzeel-qr.svg" width="112" height="112" alt="QR code linking to https://farzeel.funoonprintco.com/" />
                <span>Scan for e-card</span>
              </button>
            </div>
          </div>
          <div className={styles.tryRow}><button className="button button-black" onClick={(e) => start(e.detail === 0)} disabled={phase === "scan"}>Try the experience <ArrowRight size={18} aria-hidden="true" /></button><p>A simulated scan.<br />No camera access needed.</p></div>
        </div>
        <div className={styles.connection} aria-hidden="true"><span /><ArrowRight className={styles.desktopArrow} size={22} /><ArrowDown className={styles.mobileArrow} size={22} /></div>
        <div className={styles.phoneSide}>
          <p className={styles.stageLabel}>THE DIGITAL CONNECTION · INTERACTIVE DEMO</p>
          <div ref={preview} className={styles.phone} data-phase={phase} aria-label="Interactive phone preview" aria-busy={phase === "scan"}>
            <div className={styles.phoneTop}><span>FUNOON FZC</span><span>e-card</span></div>
            {phase !== "card" ? <div className={styles.waiting}>
              <Mark />
              <h2>Scan.<br />Connect.<br />Save.</h2>
              <p>{phase === "scan" ? "Opening the digital connection…" : "A first meeting. Everything you need for the next conversation."}</p>
              <ScanLine size={32} strokeWidth={1.2} aria-hidden="true" />
              {phase === "scan" && <span className={styles.scanLine} aria-hidden="true" />}
            </div> : <div className={styles.contact}>
              <div className={styles.identity}>
                <p className={styles.eyebrow}>LET’S CONNECT</p>
                <h2 ref={cardHeading} tabIndex={-1}>Farzeel<br />Fazir<span>.</span></h2>
                <p className={styles.role}>CEO &amp; Head of Operations<br /><span>Funoon FZC</span></p>
                <a className={styles.save} href="/ecard/Farzeel-Fazir.vcf" download="Farzeel-Fazir.vcf"><Download size={18} aria-hidden="true" /><span>Save Contact<small>Download Farzeel’s contact file</small></span></a>
                <div className={styles.actions}>{actions.map(({ label, caption, href, icon: Icon }) => <a key={label} href={href} {...(href.startsWith("https:") ? {target:"_blank", rel:"noopener noreferrer"} : {})} aria-label={`${label}: ${caption}${href.startsWith("https:") ? " (opens in a new tab)" : ""}`}><Icon size={18} aria-hidden="true" /><span>{label}<small>{caption}</small></span><ArrowUpRight size={15} aria-hidden="true" /></a>)}</div>
              </div>
              <div className={styles.signature}><Mark /><p>APPAREL · PRINTING · GIFTS</p><strong>MADE TO BE SEEN.</strong></div>
            </div>}
          </div>
          <p className={styles.status} role="status">{phase === "scan" ? "Simulating a QR scan…" : phase === "card" ? "Demo open. Contact links work; saving downloads a vCard." : "Click the QR or try the experience to begin."}</p>
          <div className={styles.controls}><button onClick={replay} disabled={phase === "intro"}><RotateCcw size={15} aria-hidden="true" />Replay demo</button><a href={live} target="_blank" rel="noopener noreferrer">Open full e-card <ArrowUpRight size={15} aria-hidden="true" /></a></div>
        </div>
      </div>
      <div className={styles.benefits}>
        <div><h2>Reach the right person</h2><p>Direct contact details for the employee your prospect met.</p></div>
        <div><h2>Save in seconds</h2><p>Download their contact without typing every detail.</p></div>
        <div><h2>Built for your whole team</h2><p>Individual employee links and QR codes within one consistent company design.</p></div>
      </div>
      <p className={styles.noApp}>No app required for visitors.</p>
    </section>
    <section className={styles.conversion}><div className="shell"><h2>Give every employee<br />a better first connection.</h2><div className={styles.ctas}><Link className="button button-white" href={enquiry}>Enquire for your team <ArrowRight size={18} aria-hidden="true" /></Link><a className="text-link" href={live} target="_blank" rel="noopener noreferrer">View a live e-card <ArrowUpRight size={16} aria-hidden="true" /></a></div></div></section>
    <section className={`${styles.personal} shell`}><div><h2>Make it yours.</h2><p>Try your own details, choose a design and preview your personal e-card.</p></div><Link className="button button-outline" href="/ecard-demo/create">Create your own demo <ArrowRight size={18} aria-hidden="true" /></Link></section>
  </>;
}
