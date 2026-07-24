import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/SocialIcons";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 py-10 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="text-white font-bold text-lg">Portfolio Next.js</p>
          <p className="text-xs text-slate-500 mt-1">
            Fullstack Portfolio & Admin Dashboard with Next.js App Router & Prisma
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-full bg-slate-900 hover:bg-slate-800 hover:text-white transition-colors border border-slate-800"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-full bg-slate-900 hover:bg-slate-800 hover:text-white transition-colors border border-slate-800"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-full bg-slate-900 hover:bg-slate-800 hover:text-white transition-colors border border-slate-800"
          >
            <TwitterIcon className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-xs text-slate-600 mt-8 pt-6 border-t border-slate-900 flex items-center justify-center gap-1">
        <span>© {new Date().getFullYear()} Built with</span>
        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
        <span>using Next.js 16</span>
      </div>
    </footer>
  );
}
