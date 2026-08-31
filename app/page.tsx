'use client';
import Image from "next/image";
import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import Modal from "./components/Modal";

const features = [
  { number: "01", title: "Give it a personality", icon: "/icons/robot-support.png", desc: "Choose a name, icon, voice, and tone so your agent feels like a natural extension of your team." },
  { number: "02", title: "Teach it what matters", icon: "/icons/file.png", desc: "Add documents, product knowledge, and your own instructions. Your agent answers from the context you provide." },
  { number: "03", title: "Put it where people work", icon: "/icons/menu.png", desc: "Embed it in a website, product, dashboard, or internal workflow—wherever questions already happen." },
  { number: "04", title: "Keep knowledge protected", icon: "/icons/lock.png", desc: "Privacy-conscious defaults help keep sensitive information out of places it does not belong." },
];
const reveal = { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.65, ease: "easeOut" as const } };

export default function Home() {
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [joinSuccess, setJoinSuccess] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  async function submitForm(event: FormEvent<HTMLFormElement>, endpoint: string, onSuccess: () => void) { event.preventDefault(); const response = await fetch(endpoint, { method: "POST", body: new FormData(event.currentTarget), headers: { Accept: "application/json" } }); if (response.ok) onSuccess(); }

  return <main>
    <header className="site-nav"><a className="wordmark" href="#top"><Image src="/icons/detective.png" alt="" width={46} height={46}/><span>EMBAGENT</span></a><nav aria-label="Main navigation"><a href="#how">How it works</a><a href="#features">Features</a><button onClick={() => setShowContactModal(true)}>Contact</button></nav><a className="nav-cta" href="/embagent/">Try the sandbox <span>↗</span></a></header>

    <section className="hero" id="top"><div className="hero-copy"><div className="eyebrow"><span className="status-dot"/> Agent builder · early access</div><h1>Your smartest<br/>teammate is <em>custom-built.</em></h1><p>Create an AI agent with your knowledge, your voice, and a job to do. No generic answers. No one-size-fits-all bot.</p><div className="hero-actions"><a className="primary-cta" href="/embagent/"><span>Build your agent</span><Image src="/icons/create.png" alt="" width={116} height={42}/></a><button className="text-link" onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })}>See how it works ↓</button></div><div className="trust-line"><span>◆ Your knowledge</span><span>◆ Your personality</span><span>◆ Your workflow</span></div></div>
      <div className="hero-visual" aria-label="EmbAgent product preview"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="detective-wrap"><Image src="/icons/detective.png" alt="EmbAgent detective mascot" width={360} height={360} priority/></div><motion.div className="clue-card clue-one" animate={{ y:[0,-8,0],rotate:[-3,-1,-3] }} transition={{duration:4,repeat:Infinity}}><Image src="/icons/file.png" alt="" width={38} height={38}/><span><strong>Context found</strong>12 files learned</span></motion.div><motion.div className="clue-card clue-two" animate={{ y:[0,7,0],rotate:[3,1,3] }} transition={{duration:4.8,repeat:Infinity}}><Image src="/icons/robot-support.png" alt="" width={42} height={42}/><span><strong>Agent ready</strong>Ask me anything</span></motion.div><div className="hero-stamp">CASE<br/>SOLVED</div></div></section>

    <div className="ticker" aria-hidden="true"><div>BUILD IT ◆ TEACH IT ◆ EMBED IT ◆ BUILD IT ◆ TEACH IT ◆ EMBED IT ◆ BUILD IT ◆ TEACH IT ◆ EMBED IT ◆</div></div>

    <motion.section className="how-section" id="how" {...reveal}><div className="section-heading"><span>THE FIELD NOTES / 001</span><h2>From blank slate<br/>to useful agent.</h2><p>Three straightforward steps. You bring the expertise; Embagent turns it into something people can talk to.</p></div><div className="steps"><article><span className="step-number">01</span><Image src="/icons/robot.png" alt="" width={76} height={76}/><h3>Create</h3><p>Name your agent, choose its role, and decide how it should sound.</p></article><article><span className="step-number">02</span><Image src="/icons/file.png" alt="" width={76} height={76}/><h3>Train</h3><p>Give it the documents and guidance it needs to answer with confidence.</p></article><article><span className="step-number">03</span><Image src="/icons/chain-linked.png" alt="" width={76} height={76}/><h3>Deploy</h3><p>Preview it, refine it, then bring it into the experience your users already know.</p></article></div></motion.section>

    <motion.section className="features-section" id="features" {...reveal}><div className="section-heading compact"><span>WHAT’S IN THE KIT / 002</span><h2>Built to feel like yours.</h2></div><div className="feature-grid">{features.map(feature=><article className="feature-card" key={feature.number}><div className="feature-top"><span>{feature.number}</span><Image src={feature.icon} alt="" width={52} height={52}/></div><h3>{feature.title}</h3><p>{feature.desc}</p></article>)}</div></motion.section>

    <motion.section className="sandbox-section" {...reveal}><div className="sandbox-art"><Image src="/icons/robot-chat.svg" alt="Friendly robot chatting" width={390} height={390}/></div><div className="sandbox-copy"><span className="eyebrow">NO COMMITMENT. JUST CURIOSITY.</span><h2>Take it for a test conversation.</h2><p>Build a lightweight agent, give it something to know, and see how it responds in the free sandbox.</p><a className="primary-cta" href="/embagent/"><span>Enter the sandbox</span><Image src="/icons/go-button.png" alt="" width={105} height={44}/></a></div></motion.section>

    <section className="get-involved"><div><span className="eyebrow">FOLLOW THE INVESTIGATION</span><h2>We’re still building.<br/>Come shape what’s next.</h2></div><div className="involved-actions"><button onClick={()=>setShowJoinModal(true)}><Image src="/icons/join.png" alt="" width={124} height={48}/><span><strong>Join the list</strong>Get product updates and early invites.</span></button><button onClick={()=>setShowContactModal(true)}><Image src="/icons/contact.png" alt="" width={124} height={48}/><span><strong>Talk to us</strong>Share feedback, ideas, or partnership plans.</span></button></div></section>

    <footer><a className="wordmark" href="#top"><Image src="/icons/detective.png" alt="" width={38} height={38}/><span>EMBAGENT</span></a><p>Custom knowledge. Useful conversations.</p><span>© {new Date().getFullYear()} Embagent</span></footer>

    <Modal isOpen={showJoinModal} onClose={()=>setShowJoinModal(false)}>{joinSuccess?<div className="success-state"><Image src="/icons/cute-robot-showing-heart.png" alt="" width={150} height={150}/><h3>You’re on the list.</h3><p>We’ll keep you in the loop as the investigation unfolds. 🥳</p></div>:<form onSubmit={e=>submitForm(e,"https://formspree.io/f/mnndzvrz",()=>setJoinSuccess(true))} className="modal-form"><span className="eyebrow">EARLY ACCESS</span><h3>Join our mailing list</h3><p>New features, progress notes, and invitations—sent occasionally.</p><input type="email" name="email" required placeholder="you@example.com"/><label className="check-row"><input type="checkbox" name="consent" required/><span>I’m happy to receive Embagent updates.</span></label><button type="submit">Join the list →</button></form>}</Modal>
    <Modal isOpen={showContactModal} onClose={()=>setShowContactModal(false)}>{contactSuccess?<div className="success-state"><Image src="/icons/robot-support.png" alt="" width={130} height={130}/><h3>Message received.</h3><p>We’ll be in touch soon. 🕵️</p></div>:<form onSubmit={e=>submitForm(e,"https://formspree.io/f/mwpoqbzl",()=>setContactSuccess(true))} className="modal-form"><span className="eyebrow">OPEN A CASE</span><h3>Talk to the team</h3><input name="name" required placeholder="Your name"/><input type="email" name="email" required placeholder="Your email"/><select name="reason"><option>General inquiry</option><option>Feedback</option><option>Partnership</option></select><textarea name="message" required placeholder="What’s on your mind?" rows={4}/><button type="submit">Send message →</button></form>}</Modal>
  </main>;
}
