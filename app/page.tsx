// app/page.tsx
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-[#222222] text-white min-h-screen px-6 py-12 space-y-24 font-sans">
      
      {/* Title Section */}
      <section className="flex flex-col items-center text-center space-y-6">
        <Image src="/icons/detective.png" alt="Embagent Logo" width={120} height={120} />
        <h1 className="text-6xl font-bold uppercase">EMBAGENT</h1>
        <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-300 transition">
          Explore Now
        </button>
      </section>

      {/* Features Section */}
      <section className="text-center">
        <h2 className="text-3xl font-semibold mb-10">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[1, 2, 3, 4].map((_, idx) => (
            <div key={idx} className="bg-[#333] p-6 rounded-xl shadow-md">
              <Image
                src={`/icons/robot-support.png`}
                alt={`Feature ${idx + 1}`}
                width={40}
                height={40}
                className="mx-auto mb-4"
              />
              <p>Feature description goes here. This will explain what the feature does in a sentence or two.</p>
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
              <button className="bg-white text-black px-4 py-2 rounded-full font-medium hover:bg-gray-300 transition">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </section>
      
    </main>
  );
}