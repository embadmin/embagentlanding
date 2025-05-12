// app/page.tsx
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-[#222222] text-white min-h-screen px-6 py-12 space-y-24 font-sans">
      
      {/* Title Section */}
      <section className="flex flex-col items-center text-center space-y-6">
        <Image src="/icons/detective.png" alt="Embagent Logo" width={120} height={120} />
        <h1 className="text-6xl font-bold uppercase">EMBAGENT</h1>
        <button className="focus:outline-none hover:opacity-90 transition">
          <Image
            src="/icons/learn-more-text-button.png"
            alt="Explore Now"
            width={180}
            height={60}
          />
        </button>
      </section>

      {/* {/* Features Section */}
      <section className="text-center">
        <h2 className="text-3xl font-semibold mb-10">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            {
              title: "Natural Conversations",
              icon: "/icons/robot-support.png",
              desc: "Upload files, documents, or enter text to define exactly what your agent should know. Make it an expert in your product, service, or anything else you choose."
            },
            {
              title: "Customize Your Agent",
              icon: "/icons/file.png",
              desc: "Upload files, documents, or enter text to define exactly what your agent should know. Make it an expert in your product, service, or anything else you choose."
            },
            {
              title: "Embeddable Widget",
              icon: "/icons/menu.png",
              desc: "AI-powered responses that feel natural and human-like, creating engaging user experiences."
            },
            {
              title: "Data Security",
              icon: "/icons/lock.png",
              desc: "Data privacy is a priority. Embagent doesn’t store sensitive information and follows best practices to keep your user interactions safe."
            },
          ].map(({ title, icon, desc }, idx) => (
            <div key={idx} className="bg-[#333] p-6 rounded-xl shadow-md border border-white/10">
              <Image
                src={icon}
                alt={title}
                width={40}
                height={40}
                className="mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-sm text-gray-300">{desc}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Get Involved Section */}
      <section className="text-center">
        <h2 className="text-3xl font-semibold mb-10">Get Involved</h2>
        <div className="space-y-6 max-w-3xl mx-auto">
          {["Try Embagent", "Join our mailing list", "Support us"].map((label, idx) => (
            <div key={idx} className="bg-[#333] p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between">
              <h3 className="text-xl font-semibold mb-2 sm:mb-0">{label}</h3>
              <button className="focus:outline-none hover:opacity-90 transition">
                <Image
                  src="/icons/contact.png"
                  alt={`Learn more about ${label}`}
                  width={160}
                  height={50}
                />
              </button>
            </div>
          ))}
        </div>
      </section>
      
    </main>
  );
}