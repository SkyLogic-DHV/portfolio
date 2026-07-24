import { User, Code2, Terminal, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      <div>
        <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold mb-2">
          <User className="w-4 h-4" />
          <span>PROFIL</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Tentang Saya
        </h1>
        <p className="text-slate-400 mt-2 text-lg">
          Fullstack Web Developer & Software Engineer
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
        <h2 className="text-2xl font-bold text-white">Hi, I&apos;m Amelia! 👋</h2>
        <p className="text-slate-300 leading-relaxed">
          Saya seorang Software Engineer yang berfokus pada pengembangan aplikasi web modern menggunakan React, Next.js, dan Node.js. Berpengalaman dalam merancang UI/UX yang responsif, performa tinggi, dan terstruktur dengan arsitektur monorepo maupun microservices.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="flex items-center gap-2 font-semibold text-indigo-400 text-sm mb-1">
              <Code2 className="w-4 h-4" />
              <span>Frontend Excellence</span>
            </div>
            <p className="text-xs text-slate-400">
              Spesialisasi di React 19, Next.js App Router, Tailwind CSS, TypeScript, dan mikro-animasi.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="flex items-center gap-2 font-semibold text-indigo-400 text-sm mb-1">
              <Terminal className="w-4 h-4" />
              <span>Robust Backend & Database</span>
            </div>
            <p className="text-xs text-slate-400">
              Pengembangan REST APIs, Prisma ORM, PostgreSQL, SQLite, dan manajemen autentikasi JWT.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 space-y-3">
          <h3 className="text-lg font-semibold text-white">Prinsip Kerja</h3>
          <div className="space-y-2">
            {[
              "Menulis kode yang bersih, terdokumentasi, dan mudah dipelihara.",
              "Fokus utama pada performa, aksesibilitas, dan respon cepat (Core Web Vitals).",
              "Pengembangan bertahap (agile) dengan integrasi data backend yang seamless.",
            ].map((principle, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>{principle}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
