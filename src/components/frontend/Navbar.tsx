"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Globe, Menu, X } from "lucide-react";

export function Navbar({ siteName = "SkyLogic" }: { siteName?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<"ID" | "EN">("ID");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-gray-200/80 py-3 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
            <Link
              href="#services"
              className="hover:text-gray-900 transition-colors duration-200"
            >
              Services
            </Link>
            <Link
              href="#projects"
              className="hover:text-gray-900 transition-colors duration-200"
            >
              Feature Projects
            </Link>
          </nav>

          {/* Center Logo */}
          <Link href="/" className="flex items-center space-x-1 group">
            <span
              className="text-2xl font-extrabold tracking-tight text-gray-900 group-hover:text-[#2563EB] transition-colors"
              style={{ letterSpacing: "-1px", lineHeight: 1 }}
            >
              Sky
            </span>
            <span
              className="relative inline-flex items-center text-2xl font-extrabold tracking-tight text-gray-900"
              style={{ letterSpacing: "-1px", lineHeight: 1 }}
            >
              L
              <span
                className="inline-block rounded-full bg-[#f5e642] mx-1 animate-pulse"
                style={{
                  width: "0.52em",
                  height: "0.52em",
                  boxShadow: "0 0 10px #f5e642cc, 0 0 22px #f5c30066",
                }}
              />
              gic
            </span>
          </Link>

          {/* Right Navigation Links & Language Switcher */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
            <Link
              href="#tools"
              className="hover:text-gray-900 transition-colors duration-200"
            >
              Tools
            </Link>
            <Link
              href="#how-it-works"
              className="hover:text-gray-900 transition-colors duration-200"
            >
              How It Works
            </Link>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === "ID" ? "EN" : "ID")}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-gray-100 border border-gray-300 text-xs font-semibold text-gray-700 hover:border-gray-400 transition-all hover:text-[#2563EB]"
            >
              <Globe className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>{lang}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={() => setLang(lang === "ID" ? "EN" : "ID")}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-gray-100 border border-gray-300 text-xs text-gray-700"
            >
              <Globe className="w-3 h-3 text-[#38BDF8]" />
              <span>{lang}</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-500 hover:text-[#2563EB]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-gray-200 px-6 py-6 space-y-4 text-center shadow-lg">
          <Link
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-600 hover:text-gray-900 py-2"
          >
            Services
          </Link>
          <Link
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-600 hover:text-gray-900 py-2"
          >
            Feature Projects
          </Link>
          <Link
            href="#tools"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-600 hover:text-gray-900 py-2"
          >
            Tools
          </Link>
          <Link
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-600 hover:text-gray-900 py-2"
          >
            How It Works
          </Link>
          <Link
            href="#leave-your-mark"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-600 hover:text-gray-900 py-2"
          >
            Leave Your Mark
          </Link>
        </div>
      )}
    </header>
  );
}
