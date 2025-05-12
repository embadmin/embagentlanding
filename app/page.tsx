'use client';
import Image from "next/image";
import { useRef, useState } from "react";
import Modal from './components/Modal';
import { motion } from "framer-motion";
export default function Home() {
  const featuresRef = useRef<HTMLElement>(null);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [joinSuccess, setJoinSuccess] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="bg-[#222222] text-white min-h-screen px-6 py-12 space-y-24 font-sans">
      
      {/* Title Section */}
      <section className="flex flex-col items-center justify-center text-center min-h-screen space-y-6">
        <Image src="/icons/detective.png" alt="Embagent Logo" width={280} height={120} />
        <h1 className="text-6xl font-anton font-bold uppercase tracking-widest">EMBAGENT</h1>
        <button onClick={scrollToFeatures} className="transition-transform duration-200 hover:scale-105 focus:outline-none">
          <Image src="/icons/go-button.png" alt="Explore Now" width={140} height={60} />
        </button>
      </section>

      {/* Features Section */}
      <motion.section
  ref={featuresRef}
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  viewport={{ amount:0.3 }}
  className="text-center"
>
  <h2 className="text-3xl font-anton font-semibold mb-10 tracking-wider">FEATURES</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
    {[
      {
        title: "Create Your Agent",
        icon: "/icons/robot-support.png",
        desc: "Make it yours. Choose your agent’s name, icon, tone of voice, and personality to match your needs. Don't see what you want? Let us know and we’ll add it.",
      },
      {
        title: "Customize Your Agent",
        icon: "/icons/file.png",
        desc: "Upload files, documents, or enter text to define exactly what your agent should know. Make it an expert in your product, service, or anything else you choose."
      },
      {
        title: "Embeddable Widget",
        icon: "/icons/menu.png",
        desc: "Agents can be embedded into web apps, dashboards, or internal platforms or even run as persistent assistants alongside your systems to support tasks and decisions as you work."
      },
      {
        title: "Data Security",
        icon: "/icons/lock.png",
        desc: "Data privacy is a priority. Embagent doesn’t store sensitive information and follows best practices to keep your user interactions safe."
      },
    ].map(({ title, icon, desc }, idx) => (
      <div key={idx} className="bg-[#333] p-6 rounded-xl shadow-md border border-white/10">
        <Image src={icon} alt={title} width={40} height={40} className="mx-auto mb-4" />
        <h3 className="text-lg font-anton font-semibold mb-2 tracking-wide">{title}</h3>
        <p className="text-sm text-gray-300">{desc}</p>
      </div>
    ))}
  </div>
</motion.section>

      {/* Get Involved Section */}
      <motion.section
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  viewport={{ amount: 0.3 }}
  className="text-center"
>        <h2 className="text-3xl font-anton font-semibold mb-10 tracking-wider">GET INVOLVED</h2>
        <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
  {[
    {
      title: "Preview Embagent",
      description: "Use our free sandbox to build and test your own agent with files and expertise.",
      button: "/icons/create.png",
      onClick: () => setShowCreateModal(true),
    },
    {
      title: "Join Our Mailing List",
      description: "Be the first to get updates, new features, and exclusive invites as we build.",
      button: "/icons/join.png",
      onClick: () => setShowJoinModal(true),
    },
    {
      title: "Support Us",
      description: "Help us grow Embagent. Share feedback, sponsor a feature, or spread the word.",
      button: "/icons/contact.png",
      onClick: () => setShowContactModal(true),
    },
  ].map(({ title, description, button, onClick }, idx) => (
    <div
      key={idx}
      className="flex flex-col justify-between items-center text-center bg-[#333] text-white rounded-xl p-6 w-full max-w-xs h-[270px] shadow-md border border-white/10"
    >
      <div className="space-y-4">
        <h3 className="text-xl font-anton font-bold tracking-wide">{title}</h3>
        <p className="text-sm text-gray-300">{description}</p>
      </div>
      <button onClick={onClick} className="transition-transform duration-200 hover:scale-105 focus:outline-none mt-6">
        <Image src={button} alt={`Learn more about ${title}`} width={120} height={40} />
      </button>
    </div>
  ))}
</div>
</motion.section>

      {/* Modals */}
      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)}>
        <Image src="/icons/coming-soon.png" alt="Coming Soon" width={500} height={500} />
      </Modal>

      <Modal isOpen={showJoinModal} onClose={() => setShowJoinModal(false)}>
  {joinSuccess ? (
    <div className="text-center space-y-4">
      <h3 className="text-xl font-bold">Thank you!</h3>
      <p>You are now on our mailing list! 🥳</p>
    </div>
  ) : (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const res = await fetch('https://formspree.io/f/mnndzvrz', {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' }
        });
        if (res.ok) setJoinSuccess(true);
      }}
      className="space-y-4"
    >
      <h3 className="text-xl font-bold">Join Our Mailing List</h3>
      <input type="email" name="email" required placeholder="Your Email" className="w-full p-2 border rounded" />
      <label className="flex items-center space-x-2 text-sm">
        <input type="checkbox" name="consent" required className="accent-black" />
        <span>I consent to receive emails</span>
      </label>
      <button type="submit" className="mx-auto block transition-transform hover:scale-105">
        <Image src="/icons/join.png" alt="Join" width={120} height={40} />
      </button>
    </form>
  )}
</Modal>

      <Modal isOpen={showContactModal} onClose={() => setShowContactModal(false)}>
  {contactSuccess ? (
    <div className="text-center space-y-4">
      <h3 className="text-xl font-bold">Thank you!</h3>
      <p>We will be in contact soon! 🏃🏽‍♀️</p>
    </div>
  ) : (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const res = await fetch('https://formspree.io/f/mwpoqbzl', {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' }
        });
        if (res.ok) setContactSuccess(true);
      }}
      className="space-y-4"
    >
      <h3 className="text-xl font-bold">Contact Us</h3>
      <input type="text" name="name" required placeholder="Your Name" className="w-full p-2 border rounded" />
      <input type="email" name="email" required placeholder="Your Email" className="w-full p-2 border rounded" />
      <select name="reason" className="w-full p-2 border rounded">
        <option>General Inquiry</option>
        <option>Feedback</option>
        <option>Partnership</option>
      </select>
      <textarea name="message" required placeholder="Your Message" className="w-full p-2 border rounded h-24" />
      <button type="submit" className="mx-auto block transition-transform hover:scale-105">
        <Image src="/icons/contact.png" alt="Send" width={120} height={40} />
      </button>
    </form>
  )}
</Modal>
    </main>
  );
}