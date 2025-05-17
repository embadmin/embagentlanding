'use client';

export default function EmbagentPage() {
  return (
    <div className="min-h-screen">
      <iframe
        src="/embagent/index.html"
        style={{ width: '100%', height: '100vh', border: 'none' }}
        title="Create Your Agent"
      />
    </div>
  );
}