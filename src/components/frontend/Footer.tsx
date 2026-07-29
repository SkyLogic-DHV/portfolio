import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/SocialIcons";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 text-gray-500 py-10 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="text-gray-800 font-bold text-lg">Portfolio Next.js</p>
          <p className="text-xs text-gray-400 mt-1">
            Fullstack Portfolio & Admin Dashboard with Next.js App Router & Prisma
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-full bg-white hover:bg-gray-100 hover:text-gray-900 transition-colors border border-gray-200"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-full bg-white hover:bg-gray-100 hover:text-gray-900 transition-colors border border-gray-200"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-full bg-white hover:bg-gray-100 hover:text-gray-900 transition-colors border border-gray-200"
          >
            <TwitterIcon className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-xs text-gray-400 mt-8 pt-6 border-t border-gray-200 flex items-center justify-center gap-1">
        <span>© {new Date().getFullYear()} Built with</span>
        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
        <span>using Next.js 16</span>
      </div>
    </footer>
  );
}